'use client'

import { useEffect, useRef } from 'react'

import { ListRenderer } from '@algoroot/shared/components'
import { cn } from '@algoroot/ui/lib/utils'

import { ChatEmitter, listeners } from '@/lib/events'

import { type Message } from '@/app/action'

import { ChatMessage, ChatPresenTation } from './@parts'

interface ChatActiveViewProps {
	messages: Message[]
}

const ChatActiveView = ({ messages }: ChatActiveViewProps) => {
	const messageRefs = useRef<(HTMLDivElement | null)[]>([])

	// 가장 최신 사용자 메세지 이동 함수 구독 (한 번만 구독)
	useEffect(() => {
		const cleanup = ChatEmitter.on(
			'chatScrollTrigger',
			listeners.chatScrollTrigger,
		)
		return cleanup
	}, [])

	// 가장 최신 사용자의 메세지로 스크롤 이동
	useEffect(() => {
		ChatEmitter.emit('chatScrollTrigger', {
			messageRefs,
		})

		// message 길이만 조회해 불필요한 호출 방지
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages.length])

	return (
		<ChatPresenTation //
		// className="border border-blue-200"
		>
			<ListRenderer
				className="h-full w-full"
				data={messages}
				render={(item: Message, idx) => {
					return (
						<div
							ref={(el) => {
								messageRefs.current[idx] = el
							}}
							className={cn(
								idx === messages.length - 1 ?
									'min-h-[calc(-280px+100dvh)]'
								:	'min-h-auto',
							)}
						>
							<ChatMessage
								role={item.role}
								content={item.content}
								className={cn(idx % 2 ? 'min-h-50' : 'h-auto')}
							/>
						</div>
					)
				}}
			/>
		</ChatPresenTation>
	)
}

export default ChatActiveView
