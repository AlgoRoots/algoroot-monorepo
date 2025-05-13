import { llm } from '../llm'
import { generateResponsePrompt } from '../prompts/generate-response.prompt'
import { type GraphAnnotationState } from '../state'

export const generateResponse = async (state: GraphAnnotationState) => {
	const { messages, searchResults, refinedQuestion, language } = state
	const prompt = await generateResponsePrompt.invoke({
		messages,
		searchResults,
		refinedQuestion,
		language,
	})

	const response = await llm.invoke(prompt)

	return {
		messages: [response],
		searchResults: null,
		refinedQuestion: null,
	}
}
