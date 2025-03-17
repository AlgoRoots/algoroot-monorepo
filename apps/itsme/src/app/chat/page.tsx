'use client'

import { Fragment } from 'react'

import ChatActionBar from '@/components/Chat/ChatActionBar'
import ChatScreen from '@/components/Chat/ChatScreen'
import { useChatContext } from '@/contexts/ChatContext'

export default function ChatPage() {
	const chat = useChatContext()

	return (
		<Fragment>
			<ChatScreen messages={chat.state.messages} />
			<ChatActionBar
				onSubmit={chat.handler.submit}
				isDisable={chat.state.isPending}
				isVisibleSubAction
			/>
		</Fragment>
	)
}
