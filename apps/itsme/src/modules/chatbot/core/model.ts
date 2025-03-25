import {
	BaseMessage,
	SystemMessage,
	trimMessages,
} from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'

import { promptTemplate } from './prompt'
import { type GraphAnnotationState } from './state'

const llm = new ChatOpenAI({
	model: 'gpt-4o-mini',
	temperature: 0,
})

/**
 * 모델 호출
 */
export const callModel = async (state: GraphAnnotationState) => {
	const { messages, searchResults } = state
	const trimmedMsg = await getTrimMessages(messages)

	// console.log(
	// 	'-------------------------------trimmedMsg',
	// 	trimmedMsg,
	// 	'-------------------------------',
	// )
	const prompt = await promptTemplate.invoke({
		messages: trimmedMsg,
		// 시스템 메세지로 가고 있지 않아 가끔 이상하게 답변 됐었음.
		searchResults: new SystemMessage(JSON.stringify(searchResults)),
	})

	const response = await llm.invoke(prompt)

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
	}
}

/**
 *
 * message history 최적화
 * @see https://js.langchain.com/docs/tutorials/chatbot#managing-conversation-history
 */
const getTrimMessages = async (messages: BaseMessage[]) => {
	const trimer = trimMessages({
		// maxTokens: 1, // TODO: 임시 토큰 1 지정, 추후 변경 필요
		maxTokens: 10,
		strategy: 'last',
		tokenCounter: (msgs) => msgs.length,
		includeSystem: true,
		allowPartial: false,
		startOn: 'human',
	})

	const res = await trimer.invoke(messages)
	return res
}
