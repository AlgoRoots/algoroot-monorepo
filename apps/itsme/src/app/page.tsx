'use client'

import { Show, ListRenderer } from '@algoroot/share/components'
import {
	ChatLayout,
	ChatForm,
	ChatMessage,
	ChatQuestionList,
	ChatQuestionSheet,
	ChatFooter,
} from '@/components/Chat'
import { useChat } from '@/hooks/useChat'
import { useCallback, useMemo } from 'react'
import type { Message } from './actions/chat'
export default function Home() {
	const chat = useChat()

	const memoChat = useMemo(
		() => (item: Message) => (
			<ChatMessage role={item.role} content={item.content} />
		),
		[],
	)

	return (
		<ChatLayout>
			<Show
				when={!chat.state.isEmpty}
				fallback={
					<div className="mx-auto mb-6 w-full">
						<p className="text-card-foreground text-center text-2xl font-bold md:text-3xl">
							대화를 시작하세요!
						</p>
					</div>
				}
			>
				<ListRenderer
					data={chat.state.messages}
					render={memoChat}
					className="w-full flex-1"
				/>
			</Show>

			<ChatFooter>
				<ChatForm
					isLoading={chat.state.isPending}
					onSubmit={chat.handler.submit}
					bottomSlot={
						<Show when={!chat.state.isEmpty}>
							<ChatQuestionSheet>
								<ChatQuestionList onClickItem={chat.handler.submit} />
							</ChatQuestionSheet>
						</Show>
					}
				/>
				<div className="text-muted-foreground text-center text-xs">
					<p>
						AI는 실수를 할 수 있습니다. 정확한 정보는 이력서에 기재되어있습니다.
					</p>
					<p>취미를 제외하고 개발 외 사적인 질문에 대한 데이터는 없습니다.</p>
				</div>
			</ChatFooter>

			<Show when={chat.state.isEmpty}>
				<ChatQuestionList onClickItem={chat.handler.submit} />
			</Show>
		</ChatLayout>
	)
}
