import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages'

import type { SearchResult } from '@/modules/api/supabase/utils/search'

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
type Metadata = {
	title?: string
	url?: string
	source?: { label: string; path: string }[]
}

const formatContent = (content: string, similarity: number, index: number) => {
	const score = (similarity * 100).toFixed(1)
	return `${index + 1}. ${content} (관련도: ${score}%)`
}

const formatLink = (metadata: Metadata): string => {
	const { source, url, title } = metadata
	if (!url || !Array.isArray(source) || source.length === 0) return ''
	return `\n\n관련 포트폴리오 링크: [${title}](${url})`
}

export const formatSearchResults = (results: SearchResult[]) => {
	return results
		.map((result, index) => {
			const content = result?.data?.pageContent || ''
			const similarity = result?.similarity || 0
			const metadata = result?.data?.metadata || {}
			const answer = result?.data?.metadata.answer

			const formattedContent = formatContent(content, similarity, index)
			const formattedLink = formatLink(metadata)

			return `[answer]:${answer}\n${formattedContent}${formattedLink}`
		})
		.join('\n\n')
}
