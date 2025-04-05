import { ChatPromptTemplate } from '@langchain/core/prompts'

import type { GraphAnnotationKey } from '../graph/state'

export const createPrompt = (
	template: string,
	placeholders: GraphAnnotationKey[],
) => {
	const system = ['system', template] as [string, string]
	const dynamic = placeholders.map(
		(p) => ['placeholder', `{${p}}`] as [string, string],
	)

	return ChatPromptTemplate.fromMessages([system, ...dynamic])
}
