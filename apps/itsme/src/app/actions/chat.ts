'use server'

import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { v4 as uuidv4 } from 'uuid'

import { app } from '@/modules/chatbot/app'
import { NODES } from '@/modules/chatbot/graph/constants'

import { createStreamableValue } from 'ai/rsc'

/**
 * rsc 환경 streaming
 * @see https://sdk.vercel.ai/cookbook/rsc/stream-text
 */

export interface Message {
	role: 'user' | 'ai'
	content: string
	type?: 'error'
}

export async function chat(history: Message[], userIp: string) {
	const stream = createStreamableValue('')
	const latest = history.at(-1)
	if (!latest?.content || latest.role !== 'user') {
		throw new Error(
			'잘못된 사용자 입력: 최신 메시지가 없거나, 사용자 메시지가 아닙니다.',
		)
	}
	const messageHistory = history.map((d) => {
		if (d.role === 'user') return new HumanMessage(d.content)
		return new AIMessage(d.content)
	})

	const inputData = {
		messages: messageHistory,
	}

	;(async () => {
		const messageStream = await app.stream(inputData, {
			configurable: { thread_id: uuidv4() },
			streamMode: 'messages',
			tags: ['user-chat', `ip:${userIp}`],
			callbacks: [
				{
					handleLLMEnd(output, runId, parentRunId, tags) {
						console.log('handleLLMEnd', { output, runId, parentRunId, tags })
					},
					handleLLMError(err, runId) {
						console.log('handleLLMError', { err, runId })
						stream.done()
					},
				},
			],
		})

		for await (const content of messageStream) {
			const [chunk, info] = content
			if (info.langgraph_node === NODES.GENERATE_RESPONSE) {
				stream.update(chunk.content)
			}
		}
		stream.done()
	})()

	return { history, newMessage: stream.value }
}
