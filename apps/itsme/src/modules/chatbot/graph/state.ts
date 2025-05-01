import { Annotation, MessagesAnnotation } from '@langchain/langgraph'

/**
 * Stateful Management of chat history
 * @see https://js.langchain.com/docs/how_to/qa_chat_history_how_to/#stateful-management-of-chat-history
 */

export type GraphAnnotationState = typeof GraphAnnotation.State

export type GraphAnnotationKey = keyof GraphAnnotationState

export const GraphAnnotation = Annotation.Root({
	...MessagesAnnotation.spec, // message field 추가,
	history: Annotation<string[]>(),
	refinedQuestion: Annotation<string | null>(),
	latest: Annotation<string | null>(),
	searchResults: Annotation<string>(),
	needSearch: Annotation<boolean>(),
})
