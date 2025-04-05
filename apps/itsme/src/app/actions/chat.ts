'use server'

import { AIMessage, HumanMessage } from '@langchain/core/messages'

import { app } from '@/modules/chatbot/app'

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
	console.log('history', history)
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
			configurable: { thread_id: userIp },
			streamMode: 'messages',
			tags: ['user-chat', `ip:${userIp}`],
			callbacks: [
				{
					handleLLMEnd(output, runId, parentRunId, tags) {
						console.log('handleLLMEnd', { output, runId, parentRunId, tags })
					},
					handleChainError(err, runId) {
						console.log('handleChainError', { err, runId })
					},
					handleLLMError(err, runId, parentRunId, tag) {
						console.log('handleLLMError', { err, runId })
					},
				},
			],
		})

		for await (const [message] of messageStream) {
			stream.update(message.content)
		}
		stream.done()
	})()

	return { history, newMessage: stream.value }
}
