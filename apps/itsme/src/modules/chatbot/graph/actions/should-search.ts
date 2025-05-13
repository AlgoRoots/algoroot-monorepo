import { llm } from '../llm'
import { shouldSearchPrompt } from '../prompts/should-search.prompt'
import type { GraphAnnotationState } from '../state'

export const shouldSearch = async (state: GraphAnnotationState) => {
	const { messages, refinedQuestion } = state
	const prompt = await shouldSearchPrompt.invoke({
		messages,
		refinedQuestion,
	})
	const result = await llm.invoke(prompt)
	const raw = result.content.toString().trim()
	const needsSearch = raw.includes('@needSearch')
	return {
		needSearch: needsSearch,
	}
}
