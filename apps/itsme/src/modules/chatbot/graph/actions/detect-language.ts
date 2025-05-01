import { llm } from '../llm'
import { detectLanguagePrompt } from '../prompts/detect-language.prompt'
import { type GraphAnnotationState } from '../state'

export const detectLanguage = async (state: GraphAnnotationState) => {
	const { messages } = state
	const latest = messages.at(-1)?.content
	const prompt = await detectLanguagePrompt.format({
		latest,
		messages,
	})
	const result = await llm.invoke(prompt)
	const raw = result.content.toString().trim()
	return {
		...state,
		language: raw,
	}
}
