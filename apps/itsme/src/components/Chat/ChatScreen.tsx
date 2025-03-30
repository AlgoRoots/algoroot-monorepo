'use client'

import { useEffect, useRef, useState } from 'react'

import { ListRenderer, ScrollDownIndicator } from '@algoroot/shared/components'
import { useIntersectionObserver } from '@algoroot/shared/hooks'
import { cn } from '@algoroot/ui/lib/utils'

import { ChatEmitter, listeners } from '@/lib/events'

import { type Message } from '@/app/actions/chat'

import { ChatMessage, ChatPresentation } from './@parts'

interface ChatScreenProps {
	messages: Message[]
	onRetry?: (prev: Message) => void
}

const ChatScreen = ({ messages, onRetry }: ChatScreenProps) => {
	const messageRefs = useRef<(HTMLElement | null)[]>([])
	const isFirstRender = useRef(true)
	const [showScrollIndicator, setShowScrollIndicator] = useState(false)

	const lastIndex = messages.length - 1

	const observerRef = useIntersectionObserver<HTMLDivElement>(
		{
			onView: () => setShowScrollIndicator(false),
			onHide: () => setShowScrollIndicator(true),
		},
		[messages.length],
	)

	// 최초 한 번만 스크롤 이벤트 리스너 등록
	useEffect(() => {
		return ChatEmitter.on('chatScrollTrigger', listeners.chatScrollTrigger)
	}, [])

	// messages 갱신될 때 최신 메시지로 스크롤 이동
	useEffect(() => {
		ChatEmitter.emit('chatScrollTrigger', {
			messageRefs,
			behavior: isFirstRender.current ? 'instant' : 'smooth',
		})
		isFirstRender.current = false
	}, [messages.length])

	return (
		<ChatPresentation>
			<ListRenderer
				className="h-full w-full"
				data={messages}
				render={(item, idx) => {
					const isLast = idx === lastIndex

					return (
						<article
							ref={(el) => {
								messageRefs.current[idx] = el
							}}
							className={cn(
								'flex flex-col py-4 md:py-6',
								isLast && 'min-h-[calc(-332px+100dvh)]',
							)}
						>
							<h2 className="sr-only">
								{item.role === 'ai' ? 'ItsMe Bot의 말' : '나의 말'}
							</h2>

							<ChatMessage
								{...item}
								onRetry={() => {
									if (idx === 0) return
									onRetry?.(messages[idx - 1]!)
								}}
								isLoading={isLast && item.content.length === 0}
							/>

							{isLast && <div ref={observerRef} />}
						</article>
					)
				}}
			/>

			<ScrollDownIndicator
				isHide={!showScrollIndicator}
				onClick={() =>
					observerRef.current?.scrollIntoView({
						block: 'end',
						behavior: 'smooth',
					})
				}
			/>
		</ChatPresentation>
	)
}

export default ChatScreen
