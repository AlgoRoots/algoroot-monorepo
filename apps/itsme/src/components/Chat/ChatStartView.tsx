'use client'

import { useChatContext } from '@/contexts/ChatContext'

import {
	ChatQuestionHeader,
	ChatQuestionList,
	ChatStartMessage,
} from './@parts'
import ChatActionBar from './ChatActionBar'

const ChatStartView = () => {
	const chat = useChatContext()

	return (
		<div className="mx-auto h-full w-full overflow-y-auto px-4 pt-10 md:pt-40">
			<ChatStartMessage />
			<ChatActionBar onSubmit={chat.handler.submit} />
			<section className="mt-10 flex w-full flex-col items-center">
				<ChatQuestionHeader />
				<ChatQuestionList onClickItem={chat.handler.submit} />
			</section>
		</div>
	)
}

export default ChatStartView
