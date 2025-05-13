import { llm } from '../llm'
import { refineQuestionPrompt } from '../prompts/refine-question.prompt'
import type { GraphAnnotationState } from '../state'

export const refineQuestion = async (state: GraphAnnotationState) => {
	const { messages, latest, language } = state

	const prompt = await refineQuestionPrompt.invoke({
		messages,
		latest,
		language,
	})

	const result = await llm.invoke(prompt)
	return {
		refinedQuestion: result?.content.toString(),
	}
}
