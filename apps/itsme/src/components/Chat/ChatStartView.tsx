'use client'

import type { ReactNode } from 'react'

import { useRouter } from 'next/navigation'

import { useChatContext } from '@/contexts/ChatContext'

import { ChatLimitDialog, ChatStartMessage } from './@parts'
import ChatActionBar from './ChatActionBar'

const ChatStartView = ({ children }: { children: ReactNode }) => {
	const chat = useChatContext()
	const router = useRouter()

	return (
		<div className="mx-auto h-full w-full overflow-y-auto px-4 pt-10 md:pt-40">
			<ChatStartMessage />
			<ChatActionBar
				onSubmit={async (val) => {
					router.push('/chat')
					await chat.handler.submit(val)
				}}
			/>
			{children}
			<ChatLimitDialog
				isOpen={chat.ip.hasExceededLimit}
				onOpenChange={chat.ip.resetLimitState}
			/>
		</div>
	)
}

export default ChatStartView
