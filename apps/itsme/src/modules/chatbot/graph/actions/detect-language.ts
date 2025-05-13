import { getTrimMessages } from '../../utils/trim'
import { llm } from '../llm'
import { detectLanguagePrompt } from '../prompts/detect-language.prompt'
import { type GraphAnnotationState } from '../state'

export const detectLanguage = async (state: GraphAnnotationState) => {
	const { messages } = state
	const trimmed = await getTrimMessages(messages)
	const latest = trimmed.at(-1)?.content || ''

	const prompt = await detectLanguagePrompt.invoke({
		messages: trimmed,
		latest,
	})

	const result = await llm.invoke(prompt)
	const raw = result.content.toString().trim()
	return {
		messages: trimmed,
		language: raw,
		latest,
	}
}
