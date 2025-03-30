import type { Metadata } from 'next'

import { HydrateClient, prefetch, trpc } from '@/modules/api/trpc/client.server'

import { ChatQuestionHeader } from '@/components/Chat'
import {
	ChatQuestionList,
	ChatQuestionListSuspense,
} from '@/components/Chat/@server/ChatQuestionList'
import ChatStartView from '@/components/Chat/ChatStartView'

export const metadata: Metadata = {
	title: 'HOME',
}

export default async function Home() {
	prefetch(trpc.getSuggestQuestions.queryOptions())
	return (
		<ChatStartView>
			<section className="mt-10 flex w-full flex-col items-center">
				<ChatQuestionHeader />
				<HydrateClient>
					<ChatQuestionListSuspense>
						<ChatQuestionList />
					</ChatQuestionListSuspense>
				</HydrateClient>
			</section>
		</ChatStartView>
	)
}
