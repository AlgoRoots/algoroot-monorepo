'use client'

import { type ReactNode, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useChatContext } from '@/contexts/ChatContext'

import { ChatLimitDialog, ChatStartMessage } from './@parts'
import ChatActionBar from './ChatActionBar'

const ChatStartView = ({ children }: { children: ReactNode }) => {
	const chat = useChatContext()
	const router = useRouter()

	useEffect(() => {
		router.prefetch('/chat')
	}, [])

	return (
		<div className="mx-auto h-full w-full overflow-y-auto px-4 pb-10 pt-10 md:pt-40">
			<ChatStartMessage />
			<ChatActionBar
				isDisable={chat.state.isPending}
				onSubmit={async (val) => {
					await chat.handler.submitHome(val)
				}}
			/>
			{children}
			<ChatLimitDialog
				isOpen={chat.ip.state.isLimitModalOpen}
				onOpenChange={chat.ip.handler.setIsLimitModalOpen}
			/>
		</div>
	)
}

export default ChatStartView
