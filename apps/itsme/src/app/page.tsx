'use client'

import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ScrollArea } from '@algoroot/ui/components/scroll-area'

import { readStreamableValue } from 'ai/rsc'
import { chat, type Message } from './actions/chat'
import ChatInput from '@/components/Chat/ChatInput'
import ChatLayout from '@/components/Chat/ChatLayout'

import ChatMessage from '@/components/Chat/ChatMessage'
import { EmptyView, ListRenderer } from '@algoroot/share/components'

export default function Home() {
	const [userId, setUserId] = useState<string | null>(null)
	const [messages, setMessages] = useState<Message[]>(
		Array.from({ length: 50 }).map((_, i) => ({
			role: i % 2 ? 'ai' : 'user',
			content: i + 'message',
		})),
	)
	const [isPending, setIsPending] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)

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
	async function handleSubmit(input: string) {
		if (!input) return

		setIsPending(true)

		try {
			const { history, newMessage } = await chat(
				[...messages, { role: 'user', content: input }],
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

				// let textContent = "";
				// for await (const delta of readStreamableValue(newMessage)) {
				//   textContent += delta;

				//   setMessages([...history, { role: "ai", content: textContent }]);

				scrollRef.current?.scrollTo({
					top: scrollRef.current.scrollHeight,
					behavior: 'smooth',
				})
			}
		} finally {
			setIsPending(false)
		}
	}

	return (
		<ChatLayout>
			<EmptyView
				isEmpty={messages.length === 0}
				fallback={
					<div className="w-full h-[80vh] flex items-center">
						<p className="my-auto mx-auto text-center text-gray-500 ">
							대화를 시작하세요!
						</p>
					</div>
				}
			>
				<ScrollArea
					ref={scrollRef}
					className="w-full h-[80vh] overflow-y-auto border-b pb-4"
				>
					<ListRenderer
						data={messages}
						render={(item, idx) => (
							<ChatMessage key={idx} role={item.role} content={item.content} />
						)}
					/>
				</ScrollArea>
			</EmptyView>
			<ChatInput isLoading={isPending} onSend={handleSubmit} />
		</ChatLayout>
	)
}
