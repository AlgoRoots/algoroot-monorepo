'use client'

import { Fragment, type ReactNode } from 'react'

import { useChatContext } from '@/contexts/ChatContext'

import { ChatLimitDialog } from './@parts'
import ChatActionBar from './ChatActionBar'
import ChatScreen from './ChatScreen'

const ChatInterface = ({ children }: { children: ReactNode }) => {
	const chat = useChatContext()
	return (
		<Fragment>
			<ChatScreen messages={chat.state.messages} />
			<ChatActionBar
				onSubmit={chat.handler.submit}
				isDisable={chat.state.isPending}
			>
				{children}
			</ChatActionBar>
			<ChatLimitDialog
				isOpen={chat.ip.state.isExceeded}
				onOpenChange={chat.ip.handler.resetIsExceeded}
			/>
		</Fragment>
	)
}

export default ChatInterface
