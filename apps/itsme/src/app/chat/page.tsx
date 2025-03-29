import { HydrateClient, prefetch, trpc } from '@/modules/api/trpc/client.server'

import { ChatQuestionSheet } from '@/components/Chat/@parts/ChatQuestionSheet'
import ChatInterface from '@/components/Chat/ChatInterface'

export default async function ChatPage() {
	prefetch(trpc.getSuggestQuestions.queryOptions())

	return (
		<ChatInterface>
			<HydrateClient>
				<ChatQuestionSheet />
			</HydrateClient>
		</ChatInterface>
	)
}
