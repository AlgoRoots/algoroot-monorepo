import { llm } from '../llm'
import { shouldSearchPrompt } from '../prompts/should-search.prompt'
import type { GraphAnnotationState } from '../state'

export const shouldSearch = async (state: GraphAnnotationState) => {
	const { messages, refinedQuestion } = state

	const prompt = await shouldSearchPrompt.format({ messages, refinedQuestion })
	const result = await llm.invoke(prompt)

	const raw = result.content.toString().trim().toLowerCase()
	const needsSearch = raw === 'true'

	return {
		...state,
		needSearch: needsSearch,
	}
}
