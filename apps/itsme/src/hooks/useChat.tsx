'use client'
import { chat, type Message } from '@/app/actions/chat'
import { readStreamableValue } from 'ai/rsc'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const mock = Array.from({ length: 5 }).map((_, i) => ({
	role: i % 2 ? 'ai' : 'user',
	content: i + 'message',
}))

export const useChat = () => {
	const [userId, setUserId] = useState<string | null>(null)
	const [messages, setMessages] = useState<Message[]>([])
	const [isPending, setIsPending] = useState(false)

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
			console.log('val',val)
			// setMessages((prev) => {
			// 	if (!prev) return mock
			// 	return ([...prev,{
			// 		role:  'user',
			// 		content:val,
			// 	}])
			// })
			// setMessages((prev) => {
			// 	if (!prev) return mock
			// 	return [...prev, ...mock].map((d, idx) => ({
			// 		role: idx % 2 ? 'ai' : 'user',
			// 		content: idx + 'msg',
			// 	}))
			// })
			// return
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

	const result = useMemo(
		() => ({
			state: {
				userId,
				messages,
				isPending,
				isEmpty,
			},
			handler: {
				submit: handleSubmit,
			},
		}),
		[userId, messages, isPending, isEmpty, handleSubmit],
	)

	return result
}

// export const [ChatProvider, useChatContext] = createContext(useChat)
