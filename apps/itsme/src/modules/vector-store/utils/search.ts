import type { DocumentInterface } from '@langchain/core/documents'

import { vectorStore } from '../lib/vector-store'
import type { Question } from './get-docs-json'

type SearchOptions = {
	/**
	 * 답변 받을 최대 개수
	 * @default 2
	 */
	count?: number
	/**
	 * 최소 유사도 기준
	 * @default 0.4
	 */
	minScore?: number
}

type Document = DocumentInterface<Question['metadata']>
type DocumentResult = [Document, number][]

export type SearchResult = {
	data: Question | null
	similarity: number | null
}

export const search = async (
	input: string,
	options?: SearchOptions,
): Promise<SearchResult[]> => {
	const { count = 3, minScore = 0.3 } = options ?? {}

	/**
	 * 필요하면 filter 함수로 metadata 넣어 필터링 시킬 수 있음
	 * @see https://js.langchain.com/docs/integrations/vectorstores/supabase/#metadata-query-builder-filtering
	 */
	const results = (await vectorStore.similaritySearchWithScore(
		input,
		count,
	)) as DocumentResult
	const bestMatch = results.filter(([_, score]) => score >= minScore)
	const data = bestMatch.map(([d, s]) => {
		return { data: d, similarity: s }
	})
	return data
}
