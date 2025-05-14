import { type VectorDocument, vectorStore } from '../vector-store'

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

export type SearchResult = {
	data: VectorDocument | null
	similarity: number | null
}

export const search = async (
	input: string,
	options?: SearchOptions,
): Promise<SearchResult[]> => {
	const { count = 4, minScore = 0.2 } = options ?? {}

	/**
	 * 필요하면 filter 함수로 metadata 넣어 필터링 시킬 수 있음
	 * @see https://js.langchain.com/docs/integrations/vectorstores/supabase/#metadata-query-builder-filtering
	 */
	const results = await vectorStore.similaritySearchWithScore(input, count)
	const answered = results.filter(([doc, score]) => {
		return score >= minScore && doc.metadata?.answer
	})

	const unanswered = results.filter(([doc, score]) => {
		return score >= minScore && !doc.metadata?.answer
	})

	const bestMatch = [...answered, ...unanswered]

	const data = bestMatch.map(([d, s]) => {
		return { data: d, similarity: s, answer: d.metadata?.answer || '정보 없음' }
	})

	return data
}
