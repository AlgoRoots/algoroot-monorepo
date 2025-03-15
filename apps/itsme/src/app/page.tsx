'use client'

import { Show } from '@algoroot/shared/components'

import { ChatInterface } from '@/components/Chat/@parts'
import ChatActionBar from '@/components/Chat/ChatActionBar'
import ChatActiveView from '@/components/Chat/ChatActiveView'
import ChatStartView from '@/components/Chat/ChatStartView'
import { useChat } from '@/hooks/useChat'

export default function Home() {
	const chat = useChat()

	const isStartChat = !chat.state.isEmpty

	return (
		<ChatInterface>
			<Show when={isStartChat} fallback={<ChatStartView chat={chat} />}>
				<ChatActiveView messages={chat.state.messages} />
				<ChatActionBar
					onSubmit={chat.handler.submit}
					isDisable={chat.state.isPending}
					isVisibleSubAction={isStartChat}
				/>
			</Show>
		</ChatInterface>
	)
}
