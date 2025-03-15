import { NextResponse } from 'next/server'

import { HumanMessage } from '@langchain/core/messages'
import { LangChainAdapter } from 'ai'

import { app } from '@/modules/chatbot/app'
import { formatSearchResults } from '@/modules/chatbot/utils/format'
import { search } from '@/modules/vector-store/utils/search'

/**
 * @legacy ai-sdk 사용하면서 action으로 변경
 * 유저 질문을 처리하는 API
 */
export async function POST(request: Request) {
	try {
		const { question, userId } = await request.json()
		console.log('@@@userId', userId)
		if (!question?.trim()) {
			return NextResponse.json(
				{ error: '질문을 입력해주세요.' },
				{ status: 400 },
			)
		}

		const searchResults = await search(question).then(formatSearchResults)

		const input = {
			messages: [new HumanMessage(question)],
			searchResults: searchResults,
		}
		console.log('input', input)
		const stream = await app.stream(input, {
			/**
			 *  대화 세션(사용자별 ID) 관리 (memory 목적)
			 *  */
			configurable: { thread_id: userId },
			streamMode: 'messages',
		})

		const textEncoder = new TextEncoder()
		const transformStream = new ReadableStream({
			async start(controller) {
				for await (const [message, _metadata] of stream) {
					if (message) {
						controller.enqueue(textEncoder.encode(message))
					}
				}
				controller.close()
			},
		})

		/**
		 * https://github.com/langchain-ai/langchain-nextjs-template/issues/56
		 */
		return LangChainAdapter.toDataStreamResponse(transformStream)
	} catch (error) {
		console.error('❌ 서버 오류:', error)
		return NextResponse.json(
			{ error: '서버 오류가 발생했습니다.' },
			{ status: 500 },
		)
	}
}
