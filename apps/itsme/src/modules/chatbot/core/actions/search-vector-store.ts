import { search } from '@/modules/api/supabase/utils/search'

import { formatSearchResults } from '../../utils/format'
import type { GraphAnnotationState } from '../state'

/**
 *  검색
 */
export const searchVectorStore = async (state: GraphAnnotationState) => {
	const { messages } = state
	const input = messages.at(-1)?.content.toString() ?? ''
	const searchResults = await search(input).then(formatSearchResults)
	return {
		...state,
		searchResults:
			searchResults || '⚠️ 참고 정보가 없습니다. (아래는 비어 있음)',
	}
}
