import { search } from '@/modules/api/supabase/utils/search'

import { formatSearchResults } from '../../utils/format'
import type { GraphAnnotationState } from '../state'

/**
 *  검색
 */
export const searchVectorStore = async (state: GraphAnnotationState) => {
	const { refinedQuestion } = state
	const input = refinedQuestion || ''
	const searchResults = await search(input).then(formatSearchResults)
	return {
		searchResults,
	}
}
