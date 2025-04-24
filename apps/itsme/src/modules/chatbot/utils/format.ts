import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages'

import type { SearchResult } from '@/modules/api/supabase/utils/search'
import type { Metadata } from '@/modules/api/supabase/vector-store'
import { createHash } from 'crypto'

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
 * vector search 결과 전체 포맷
 */
export const formatSearchResults = (results: SearchResult[]): string => {
	if (results.length === 0) {
		return '⚠️ 참고 정보가 없습니다.'
	}

	return results
		.map((result, index) => formatSingleResult(result, index))
		.filter(Boolean)
		.join('\n\n---\n\n')
}

/**
 * 개별 vector search 결과 포맷
 */
const formatSingleResult = (result: SearchResult, index: number): string => {
	const doc = result.data
	if (!doc) return ''

	const similarity = result.similarity ?? 0
	const score = (similarity * 100).toFixed(1)
	const meta = extractMetadata(doc.metadata, index)

	return formatTextBlock({
		title: meta.title,
		answer: meta.answer,
		summary: doc.pageContent,
		link: meta.link,
		score,
	})
}

/**
 * 메타데이터 정제
 */
const extractMetadata = (
	meta: Metadata | undefined,
	index: number,
): {
	title: string
	answer: string
	link: string | null
} => {
	return {
		title: meta?.title || `관련 정보 ${index + 1}`,
		answer: meta?.answer || '없음',
		link: meta?.url || meta?.source?.[0]?.path || null,
	}
}

/**
 * 링크 텍스트 포맷
 */
const formatLink = (title: string, link: string | null): string | null => {
	if (!link) return null
	return `**관련 포트폴리오 링크:** [${title}](${link})`
}

/**
 * 마크다운 블록 구성
 */
const formatTextBlock = (params: {
	title: string
	answer: string
	summary: string
	link: string | null
	score: string
}): string => {
	const { title, answer, summary, link, score } = params

	const lines = [
		`🔍 ** 제목:${title}(관련도: ${score}%) **`,
		`**우선 답변:** ${answer}`,
		`**내용 요약:** ${summary.trim()}`,
	]

	const linkText = formatLink(title, link)
	if (linkText) {
		lines.push(linkText)
	}

	return lines.join('\n\n')
}


export const hash = (value: string) => {
	return createHash('sha256').update(value).digest('hex')
}