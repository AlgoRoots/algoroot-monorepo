import type { SearchResult } from "@/modules/vector-store/utils/search";
import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

/**
 * Stateful Management of chat history
 * @see https://js.langchain.com/docs/how_to/qa_chat_history_how_to/#stateful-management-of-chat-history
 */

export type GraphAnnotationState = typeof GraphAnnotation.State;
export const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec, // message field 추가,
  content: Annotation<string | null>(),
  keywords: Annotation<string[] | null>(),
  searchResults: Annotation<string | null>(),
});
