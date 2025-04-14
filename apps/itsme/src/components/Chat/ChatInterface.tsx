'use client'

import { Fragment, type ReactNode, useEffect, useRef } from 'react'

import { useChatContext } from '@/contexts/ChatContext'

import { ChatLimitDialog } from './@parts'
import ChatActionBar from './ChatActionBar'
import ChatScreen from './ChatScreen'

const ChatInterface = ({ children }: { children: ReactNode }) => {
	const chat = useChatContext()
	const hasRun = useRef(false)

	// 홈에서 전달된 메시지가 있을 경우 자동 전송
	useEffect(() => {
		if (hasRun.current) return
		hasRun.current = true
		if (chat.state.pendingMessage) {
			chat.handler.submit(chat.state.pendingMessage)
			chat.handler.setPendingMessage(null)
		}
	}, [])

	return (
		<Fragment>
			<ChatScreen messages={chat.state.messages} onRetry={chat.handler.retry} />
			<ChatActionBar
				onSubmit={chat.handler.submit}
				isDisable={chat.state.isPending}
			>
				{children}
			</ChatActionBar>
			<ChatLimitDialog
				isOpen={chat.ip.state.isLimitModalOpen}
				onOpenChange={chat.ip.handler.setIsLimitModalOpen}
			/>
		</Fragment>
	)
}

export default ChatInterface
