import type { MessageContent } from '@langchain/core/messages'
import { Annotation, MessagesAnnotation } from '@langchain/langgraph'

/**
 * Stateful Management of chat history
 * @see https://js.langchain.com/docs/how_to/qa_chat_history_how_to/#stateful-management-of-chat-history
 */

export type GraphAnnotationState = typeof GraphAnnotation.State

export type GraphAnnotationKey = keyof GraphAnnotationState
/**
 *
 * export const StateAnnotation = Annotation.Root({
 *   messages: Annotation<BaseMessage[]>({
 *     reducer: messagesStateReducer, // 누적
 *     default: () => [],
 *   }),
 * });
 */
export const GraphAnnotation = Annotation.Root({
	...MessagesAnnotation.spec, // message field 추가,
	refinedQuestion: Annotation<string>(),
	latest: Annotation<MessageContent>(),
	searchResults: Annotation<string | null>(),
	needSearch: Annotation<boolean>(),
	language: Annotation<string>(),
})
