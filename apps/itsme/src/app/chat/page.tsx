import { HydrateClient, prefetch, trpc } from '@/modules/api/trpc/server'

import { ChatQuestionSheet } from '@/components/Chat/@parts/ChatQuestionSheet'
import ChatInterface from '@/components/Chat/ChatInterface'

/**
 * https://sdk.vercel.ai/docs/troubleshooting/timeout-on-vercel
 */
export const maxDuration = 60

export default async function ChatPage() {
	await prefetch(trpc.getSuggestQuestions.queryOptions())

	return (
		<ChatInterface>
			<HydrateClient>
				<ChatQuestionSheet />
			</HydrateClient>
		</ChatInterface>
	)
}
