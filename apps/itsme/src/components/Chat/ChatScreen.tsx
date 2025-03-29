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
}

const ChatScreen = ({ messages }: ChatScreenProps) => {
	const messageRefs = useRef<(HTMLElement | null)[]>([])
	const isFirstRender = useRef(true)
	const [showScrollIndicator, setShowScrollIndicator] = useState(false)

	const observerRef = useIntersectionObserver<HTMLDivElement>(
		{
			onView: () => {
				setShowScrollIndicator(false)
			},
			onHide: () => {
				setShowScrollIndicator(true)
			},
		},
		[messageRefs.current.length],
	)

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
			// home 에서 올 경우 instant scrollTo
			behavior: isFirstRender.current ? 'instant' : 'smooth',
		})

		isFirstRender.current = false

		// message 길이만 조회해 불필요한 호출 방지
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages.length])

	const isLast = (idx: number) => idx === messages.length - 1
	return (
		<ChatPresentation>
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
								'flex flex-col py-4 md:py-6',
								isLast(idx) ? 'min-h-[calc(-332px+100dvh)]' : '',
							)}
						>
							<h2 className="sr-only">
								{item.role === 'ai' ? 'ItsMe Bot의 말' : '나의 말'}
							</h2>
							<ChatMessage
								{...{ ...item }}
								isLoading={isLast(idx) && item.content.length === 0}
							/>
							{isLast(idx)} <div ref={observerRef} />
						</article>
					)
				}}
			/>

			<ScrollDownIndicator
				isHide={!showScrollIndicator}
				onClick={() => {
					observerRef.current?.scrollIntoView({
						block: 'end',
						behavior: 'smooth',
					})
				}}
			/>
		</ChatPresentation>
	)
}

export default ChatScreen
