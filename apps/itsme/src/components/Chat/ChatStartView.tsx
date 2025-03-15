import type { useChat } from '@/hooks/useChat'

import {
	ChatQuestionHeader,
	ChatQuestionList,
	ChatStartMessage,
} from './@parts'
import ChatActionBar from './ChatActionBar'

const ChatStartView = ({ chat }: { chat: ReturnType<typeof useChat> }) => {
	return (
		<div className="flex w-full flex-col items-center">
			<ChatStartMessage />
			<ChatActionBar onSubmit={chat.handler.submit} />
			<div className="mt-10 flex w-full flex-col items-center">
				<ChatQuestionHeader />
				<ChatQuestionList onClickItem={chat.handler.submit} />
			</div>
		</div>
	)
}

export default ChatStartView
