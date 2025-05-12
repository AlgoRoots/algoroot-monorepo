import { formatChatHistory } from '../../utils/format'
import { getTrimMessages } from '../../utils/trim'
import { llm } from '../llm'
import { refineQuestionPrompt } from '../prompts/refine-question.prompt'
import type { GraphAnnotationState } from '../state'

export const refineQuestion = async (state: GraphAnnotationState) => {
	const { messages, language } = state
	const trimmed = await getTrimMessages(messages)
	const latest = trimmed.at(-1)?.content
	const history = formatChatHistory(trimmed)
	const prompt = await refineQuestionPrompt.format({
		messages: trimmed,
		history,
		latest,
		language,
	})

	const result = await llm.invoke(prompt)
	return {
		...state,
		refinedQuestion: result?.content.toString(),
		history,
	}
}
