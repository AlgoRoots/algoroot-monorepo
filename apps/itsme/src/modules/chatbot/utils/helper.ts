import {
	ChatPromptTemplate,
	MessagesPlaceholder,
} from '@langchain/core/prompts'

import type { GraphAnnotationState } from '../graph/state'

export const createPrompt = <
	const T extends ReadonlyArray<keyof GraphAnnotationState>,
>(
	template: string,
	keys: T,
) => {
	const prompt = ChatPromptTemplate.fromMessages<{
		[K in T[number]]: GraphAnnotationState[K]
	}>([['system', template], new MessagesPlaceholder('messages')])

	return prompt
}
