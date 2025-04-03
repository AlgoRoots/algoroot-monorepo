import { SystemMessage } from '@langchain/core/messages'

import { llm } from '../llm'
import { chatPrompt } from '../prompt'
import { type GraphAnnotationState } from '../state'

/**
 * 모델 호출
 */
export const callModel = async (state: GraphAnnotationState) => {
	const { messages, searchResults } = state
	const prompt = await chatPrompt.invoke({
		messages,
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
