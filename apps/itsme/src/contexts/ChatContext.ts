'use client'

import { startTransition, useCallback, useRef, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { createContext } from '@algoroot/shared/utils'
import { useMutation } from '@tanstack/react-query'

import { useUserIp } from '@/hooks/useUserIp'

import { chat, type Message } from '@/app/actions/chat'

import { readStreamableValue } from 'ai/rsc'

const mock = Array.from({ length: 2 }).map((_, i) => ({
	role: i % 2 ? 'ai' : 'user',
	content: i + 'message',
}))

const updateMessage = (prev: Message[], delta?: string): Message[] => {
	const last = prev.at(-1)
	if (!last || last.role !== 'ai') return prev

	const rest = prev.slice(0, -1)
	const updated = { ...last, content: last.content + delta }

	return [...rest, updated]
}

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>([])
	const messageRefs = useRef<(HTMLDivElement | null)[]>([])
	const router = useRouter()
	const pathname = usePathname()

	const userIp = useUserIp()
	const isEmpty = messages.length === 0

	const { isPending, mutate: invoke } = useMutation({
		mutationFn: async (val: string) => {
			const { newMessage } = await chat(
				[...messages, { role: 'user', content: val }],
				userIp.ip!,
			)
			for await (const delta of readStreamableValue(newMessage)) {
				setMessages((prev) => updateMessage(prev, delta))
			}
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

			await userIp.addIpCount(
				{
					ip: userIp.ip || '',
				},
				{
					onSuccess: () => {
						startTransition(() => {
							setMessages((prev) => [
								...prev,
								{ role: 'user', content: val },
								{ role: 'ai', content: '' },
							])
						})
						invoke(val)
					},
				},
			)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[messages, pathname, router, userIp.ip],
	)

	return {
		messageRefs,
		ip: userIp,
		state: {
			userIp: userIp.ip,
			messages,
			isPending,
			isEmpty,
		},
		handler: {
			submit: handleSubmit,
		},
	}
}

export const [ChatProvider, useChatContext] = createContext(useChat)

const test = () => {
	// setIsPending(true)
	// setMessages((prev: Message[]) => {
	// 	if (!prev) return mock as Message[]
	// 	return [
	// 		...prev,
	// 		{
	// 			role: 'user' as const,
	// 			content: `user: ${val}`,
	// 		},
	// 		{
	// 			role: 'ai' as const,
	// 			content: ``,
	// 		},
	// 	]
	// })
	// setTimeout(() => {
	// 	setMessages((prev) => {
	// 		if (!prev) return mock as Message[]
	// 		const updated = prev.slice(0, prev.length - 1)
	// 		return [
	// 			...updated,
	// 			{
	// 				role: 'ai' as const,
	// 				content: [
	// 					`ai: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
	// 	`,
	// 				]
	// 					.map((c) => c + c + c + c)
	// 					.flat()
	// 					.join('.'),
	// 			},
	// 		]
	// 	})
	// }, 1000)
	// setTimeout(() => setIsPending(false), 2000)
	// return
	// setMessages((prev) => {
	// 	if (!prev) return mock as Message[]
	// 	return [...prev, ...mock].map((d, idx) => ({
	// 		role: idx % 2 ? ('ai' as const) : ('user' as const),
	// 		content:
	// 			idx % 2 ? `ai: ${idx} ai 답변~~` : `user: ${idx} ${d.content}`,
	// 	}))
	// })
	// return
}
