'use client'

import { useEffect, useRef } from 'react'

import {
	If,
	ListRenderer,
	LoadingView,
	Show,
} from '@algoroot/shared/components'
import { cn } from '@algoroot/ui/lib/utils'
import { CircleIcon } from 'lucide-react'

import { ChatEmitter, listeners } from '@/lib/events'

import { type Message } from '@/app/action'

import { ChatMessage, ChatMessageSpinner, ChatPresentation } from './@parts'

interface ChatActiveViewProps {
	messages: Message[]
	isLoading?: boolean
}

const ChatActiveView = ({ messages, isLoading }: ChatActiveViewProps) => {
	const messageRefs = useRef<(HTMLElement | null)[]>([])

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

	const isLast = (idx: number) => idx === messages.length - 1
	return (
		<ChatPresentation //
		// className="border border-blue-200"
		>
			<ListRenderer
				className="h-full w-full"
				data={messages}
				render={(item: Message, idx) => {
					return (
						<article
							ref={(el) => {
								messageRefs.current[idx] = el
							}}
							className={cn(
								'flex py-4 md:py-6',
								isLast(idx) ? 'min-h-[calc(-250px+100dvh)]' : '',
							)}
						>
							<h2 className="sr-only">
								{item.role === 'ai' ? 'ItsMe Bot의 말' : '나의 말'}
							</h2>
							<ChatMessage
								role={item.role}
								content={item.content}
								className="h-fit"
								isLoading={isLast(idx) && item.content.length === 0}
								// className={cn(idx % 2 ? 'min-h-50' : 'h-auto')}
							/>
						</article>
					)
				}}
			/>
		</ChatPresentation>
	)
}

export default ChatActiveView
