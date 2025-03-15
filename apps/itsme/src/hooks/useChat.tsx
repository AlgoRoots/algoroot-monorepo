'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { chat, type Message } from '@/app/action'

import { readStreamableValue } from 'ai/rsc'

const mock = Array.from({ length: 2 }).map((_, i) => ({
	role: i % 2 ? 'ai' : 'user',
	content: i + 'message',
}))

export const useChat = () => {
	const [userId, setUserId] = useState<string | null>(null)
	const [messages, setMessages] = useState<Message[]>([])
	const [isPending, setIsPending] = useState(false)
	const messageRefs = useRef<(HTMLDivElement | null)[]>([])

	const isEmpty = messages.length === 0

	useEffect(() => {
		setUserId(uuidv4())
	}, [])

	/**
	 * 스트리밍 작업에서 처음 했던 방식 :
	 * https://sdk.vercel.ai/cookbook/rsc/stream-text
	 * history르
	 * 스트리밍 작업에서 개선한 방식 : 위 방식도 동일하게 구현할 수 있지만, 이 방법이 더 깔꼼하고 직관적이어서 바꿈
	 * https://sdk.vercel.ai/cookbook/rsc/stream-text-with-chat-prompt
	 */
	const handleSubmit = useCallback(
		async (val: string) => {
			setIsPending(true)
			console.log('###########@@@@@chat@@@#@@@@@val', val)
			setMessages((prev) => {
				if (!prev) return mock
				return [
					...prev,
					{
						role: 'user',
						content: `user: ${val}`,
					},
					{
						role: 'ai',
						content: ``,
					},
				]
			})

			setTimeout(() => {
				setMessages((prev) => {
					if (!prev) return mock
					const updated = prev.slice(0, prev.length - 1)
					return [
						...updated,
						{
							role: 'ai',
							content: `ai: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				`,
						},
					]
				})
			}, 1000)

			setTimeout(() => setIsPending(false), 2000)
			return
			setMessages((prev) => {
				if (!prev) return mock
				return [...prev, ...mock].map((d, idx) => ({
					role: idx % 2 ? 'ai' : 'user',
					content:
						idx % 2 ? `ai: ${idx} ai 답변~~` : `user: ${idx} ${d.content}`,
				}))
			})
			return
			if (!val) return

			setIsPending(true)

			try {
				const { history, newMessage } = await chat(
					[...messages, { role: 'user', content: val }],
					userId!,
				)

				setMessages([...history, { role: 'ai', content: '' }])

				// 새 배열을 생성하는 방식에서 prev로 필요한 아이템만 수정하는 쪽으로 변경
				for await (const delta of readStreamableValue(newMessage)) {
					setMessages((prevMessages) =>
						prevMessages.map((msg, idx) =>
							idx === prevMessages.length - 1 ?
								{ ...msg, content: msg.content + delta }
							:	msg,
						),
					)
				}
			} finally {
				setIsPending(false)
			}
		},
		[messages],
	)

	return {
		messageRefs,
		state: {
			userId,
			messages,
			isPending,
			isEmpty,
		},
		handler: {
			submit: handleSubmit,
		},
	}
}

// export const [ChatProvider, useChatContext] = createContext(useChat)
