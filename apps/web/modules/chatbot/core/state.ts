import type { SearchResult } from "@/modules/vector-store/utils/search";
import type { BaseMessageLike } from "@langchain/core/messages";
import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

/**
 * Stateful Management of chat history
 * @see https://js.langchain.com/docs/how_to/qa_chat_history_how_to/#stateful-management-of-chat-history
 */

export type GraphAnnotationState = typeof GraphAnnotation.State;
export const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec, // message field 추가,
  // messages: Annotation<BaseMessageLike[]>({
  //   reducer: (x, y) => x.concat(y), // 이전 메시지와 새로운 메시지를 합침
  // }),
  content: Annotation<string | null>(),
  keywords: Annotation<string[] | null>(),
  searchResults: Annotation<string | null>(),
});
