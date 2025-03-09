import { type GraphAnnotationState } from "./state";
import {
  BaseMessage,
  SystemMessage,
  trimMessages,
} from "@langchain/core/messages";
import { promptTemplate } from "./propmt";
import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

/**
 * 모델 호출
 */
export const callModel = async (state: GraphAnnotationState) => {
  const { messages, searchResults } = state;
  const trimmedMsg = await getTrimMessages(messages);
  /**
   * 여기서 프롬포트를 만들 때 메세지를 자르는데,
   * llm message 상태가 같이 반영되는 것은 아닌 것으로 보임
   * 프롬포트를 구성할 때 전달할 메세지 개수의 한계를 두는 용도인지?
   * (output은 전체가 다 출력되고 있음)
   */
  const prompt = await promptTemplate.invoke({
    messages: trimmedMsg,
    // 시스템 메세지로 가고 있지 않아 가끔 이상하게 답변 됐었음.
    searchResults: new SystemMessage(JSON.stringify(searchResults)),
  });

  const response = await llm.invoke(prompt);

  /**
   * MemorySaver 설정으로 인해 메세지는 계속 저장되는 걸로 보임
   * 문서에는
   * return {messages: response} 로 되어있는데 이렇게하면 모든 메세지가
   * Human message로 되는 이슈가 있어서 AI Message 로 포맷함
   */

  return {
    // 이슈 streaming 적용하면서 이 부분이 스트리밍 끝난 후 ai 메세지로 출력 되어 AI메세지가 반복되어 나왔음.
    // messages: [new AIMessage({ content: response.content })],
    messages: [response],
  };
};

/**
 *
 * message history 최적화
 * @see https://js.langchain.com/docs/tutorials/chatbot#managing-conversation-history
 */
const getTrimMessages = async (messages: BaseMessage[]) => {
  const trimer = trimMessages({
    maxTokens: 1, // 임시
    // maxTokens: 5,
    strategy: "last",
    tokenCounter: (msgs) => msgs.length,
    includeSystem: true,
    allowPartial: false,
    startOn: "human",
  });

  const res = await trimer.invoke(messages);
  return res;
};
