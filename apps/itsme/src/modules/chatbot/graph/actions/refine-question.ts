import { getTrimMessages } from '../../utils/trim'
import { llm } from '../llm'
import { refineQuestionPrompt } from '../prompts/refine-question.prompt'
import type { GraphAnnotationState } from '../state'

export const refineQuestion = async (state: GraphAnnotationState) => {
	const { messages } = state
	const trimmed = await getTrimMessages(messages)
	const latest = trimmed.at(-1)?.content
	const prompt = await refineQuestionPrompt.format({
		messages: trimmed,
		latest,
	})
	const result = await llm.invoke(prompt)
	console.log('@@@@@result', result.content)
	return {
		...state,
		messages: trimmed,
		refinedQuestion: result.content.toString().trim(),
	}
}
