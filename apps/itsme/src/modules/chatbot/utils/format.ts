import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages'

import type { SearchResult } from '@/modules/vector-store/utils/search'

export const formatChatHistory = (messages: BaseMessage[]) => {
	return messages
		.map((msg) => {
			if (msg instanceof HumanMessage) {
				return `사용자: ${msg.content}`
			} else if (msg instanceof AIMessage) {
				return `AI: ${msg.content}`
			}
			return ''
		})
		.join('\n')
}

/**
 * 프롬포트 템플릿 전달을 위해 검색 결과 포맷
 */
export const formatSearchResults = (results: SearchResult[]) => {
	return results
		.map(
			(result, index) =>
				`${index + 1}. ${result?.data?.pageContent} (관련도: ${(
					(result?.similarity || 0) * 100
				).toFixed(1)}%)`,
		)
		.join('\n\n')
}
