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
		<div className="mx-auto h-full w-full overflow-y-auto px-4 pb-10 pt-10 md:pt-40">
			<ChatStartMessage />
			<ChatActionBar
				isDisable={chat.state.isPending}
				onSubmit={async (val) => {
					if (await chat.ip.handler.checkMaxLimit()) return
					router.push('/chat')
					await chat.handler.submit(val)
				}}
			/>
			{children}
			<ChatLimitDialog
				isOpen={chat.ip.state.isExceeded}
				onOpenChange={chat.ip.handler.resetIsExceeded}
			/>
		</div>
	)
}

export default ChatStartView
