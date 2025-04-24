'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { createContext } from '@algoroot/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

import { useUserIp } from '@/hooks/useUserIp'

import { chat, type Message } from '@/app/actions/chat'

import { readStreamableValue, type StreamableValue } from 'ai/rsc'

export async function updateStreamMessage(
	stream: StreamableValue<string, any>,
	update: (updater: (prev: Message[]) => Message[]) => void,
) {
	let content = ''

	for await (const delta of readStreamableValue(stream)) {
		content += delta

		update((prev) => {
			const newMessages = [...prev]
			const last = newMessages.at(-1)
			if (!last || last.role !== 'ai') return prev
			newMessages[newMessages.length - 1] = { ...last, content }
			return newMessages
		})
	}
}

export const useChat = () => {
	const router = useRouter()
	/**
	 * thread_id에 넘길 id입니다.
	 * thread_id는 대화의 고유 세션 ID로, 메시지 히스토리를 구분하는 데 사용됩니다.
	 * 대화 히스토리를 새로고침 시마다 리셋하기 위해, thread_id는 앱 실행 시마다 새로 생성됩니다.
	 * 새로고침시 히스토리를 유지하지 않는 구조가 현재 서비스 목적에 더 적합하다고 판단했습니다.
	 */
	const [id, setId] = useState('')
	const [messages, setMessages] = useState<Message[]>([])
	const [pendingMessage, setPendingMessage] = useState<string | null>(null)
	const messageRefs = useRef<(HTMLDivElement | null)[]>([])

	const ip = useUserIp()
	const isEmpty = messages.length === 0

	const { isPending, mutate: invoke } = useMutation({
		mutationFn: async (val: string) => {
			const userMessage: Message = { role: 'user', content: val }
			const aiPlaceholder: Message = { role: 'ai', content: '' }

			setMessages((prev) => [...prev, userMessage, aiPlaceholder])

			const { newMessage } = await chat([...messages, userMessage], {
				thread_id: id,
				userIp: ip.state.ip,
			})

			await updateStreamMessage(newMessage, setMessages)
		},
		onSuccess: async () => {
			ip.handler.addIpCount({ ip: ip.state.ip })
		},
		onError: (error) => {
			setMessages((prev) => {
				const newMessages = [...prev]
				const last = newMessages.at(-1)
				if (last) last.type = 'error'
				return newMessages
			})
			console.log('error', error)
		},
	})

	/**
	 * 스트리밍 작업에서 처음 했던 방식 :
	 * https://sdk.vercel.ai/cookbook/rsc/stream-text
	 * history르
	 * 스트리밍 작업에서 개선한 방식 : 위 방식도 동일하게 구현할 수 있지만, 이 방법이 더 깔꼼하고 직관적이어서 바꿈
	 * https://sdk.vercel.ai/cookbook/rsc/stream-text-with-chat-prompt
	 */
	const handleSubmit = useCallback(
		async (val: string) => {
			if (!val) return

			if (await ip.handler.checkMaxLimit()) return

			invoke(val)
		},
		[invoke, ip.handler],
	)

	const handleHomeSubmit = useCallback(
		async (val: string) => {
			if (await ip.handler.checkMaxLimit()) return
			router.push('/chat')
			setPendingMessage(val)
		},
		[ip.handler, router],
	)

	const handleRetry = useCallback(
		(prevMsg: Message) => {
			handleSubmit(prevMsg.content)
		},
		[handleSubmit],
	)

	useEffect(() => {
		setId(uuidv4())
	}, [])

	return {
		messageRefs,
		ip,
		state: {
			messages,
			isPending,
			isEmpty,
			pendingMessage,
		},
		handler: {
			submit: handleSubmit,
			submitHome: handleHomeSubmit,
			retry: handleRetry,
			setPendingMessage,
		},
	}
}

export const [ChatProvider, useChatContext] = createContext(useChat)
