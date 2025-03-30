'use client'

import { useCallback, useRef, useState } from 'react'

import { createContext } from '@algoroot/shared/utils'
import { useMutation } from '@tanstack/react-query'

import { useUserIp } from '@/hooks/useUserIp'

import { chat, type Message } from '@/app/actions/chat'

import { readStreamableValue } from 'ai/rsc'

const updateMessage = (prev: Message[], delta?: string): Message[] => {
	const last = prev.at(-1)
	if (!last || last.role !== 'ai') return prev

	const rest = prev.slice(0, -1)
	const updated = { ...last, content: last.content + (delta ?? '') }

	return [...rest, updated]
}

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>([])
	const messageRefs = useRef<(HTMLDivElement | null)[]>([])

	const ip = useUserIp()
	const isEmpty = messages.length === 0

	const { isPending, mutate: invoke } = useMutation({
		mutationFn: async () => {
			setMessages((prev) => [...prev, { role: 'ai', content: '' }])
			const { newMessage } = await chat([...messages], ip.state.ip)
			for await (const delta of readStreamableValue(newMessage)) {
				setMessages((prev) => updateMessage(prev, delta))
			}
		},
		onSuccess: async () => {
			ip.handler.addIpCount({ ip: ip.state.ip })
		},
		onError: (error) => {
			setMessages((prev) => {
				const newMessages = [...prev]
				const lastMessage = newMessages.at(-1)
				if (!lastMessage) return newMessages
				lastMessage.type = 'error'
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

			setMessages((prev) => [...prev, { role: 'user', content: val }])

			invoke()
		},
		[invoke, ip.handler],
	)

	const handleRetry = useCallback(
		(prevMsg: Message) => {
			handleSubmit(prevMsg.content)
		},
		[handleSubmit],
	)

	return {
		messageRefs,
		ip,
		state: {
			messages,
			isPending,
			isEmpty,
		},
		handler: {
			submit: handleSubmit,
			retry: handleRetry,
		},
	}
}

export const [ChatProvider, useChatContext] = createContext(useChat)
