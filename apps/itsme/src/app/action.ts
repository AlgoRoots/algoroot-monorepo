'use server'

import { AIMessage, HumanMessage } from '@langchain/core/messages'

import { app } from '@/modules/chatbot/app'
import { formatSearchResults } from '@/modules/chatbot/utils/format'
import { search } from '@/modules/vector-store/utils/search'

import { createStreamableValue } from 'ai/rsc'

/**
 * rsc 환경 streaming
 * @see https://sdk.vercel.ai/cookbook/rsc/stream-text
 */

export interface Message {
	role: 'user' | 'ai'
	content: string
}

export async function chat(history: Message[], userId: string) {
	const stream = createStreamableValue('')

	const latest = history.at(-1)

	if (!latest?.content || latest.role !== 'user') {
		throw new Error(
			'잘못된 사용자 입력: 최신 메시지가 없거나, 사용자 메시지가 아닙니다.',
		)
	}
	const input = latest.content

	;(async () => {
		const searchResults = await search(input).then(formatSearchResults)
		const config = { thread_id: userId }
		const messageHistory = history.map((d) => {
			if (d.role === 'user') return new HumanMessage(d.content)
			return new AIMessage(d.content)
		})

		const inputData = {
			messages: messageHistory,
			searchResults,
		}

		const messageStream = await app.stream(inputData, {
			/**
			 *  대화 세션(사용자별 ID) 관리 (memory 목적, 다 이용자일떄..)
			 */
			configurable: config,
			streamMode: 'messages',
		})

		for await (const [message] of messageStream) {
			if (message?.content) {
				stream.update(message.content)
			}
		}
		stream.done()
	})()

	return { history, newMessage: stream.value }
}
