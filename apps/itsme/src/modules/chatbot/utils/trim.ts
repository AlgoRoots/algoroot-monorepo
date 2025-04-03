import { BaseMessage, trimMessages } from '@langchain/core/messages'

/**
 *
 * message history 최적화
 * @see https://js.langchain.com/docs/tutorials/chatbot#managing-conversation-history
 */
export const getTrimMessages = async (messages: BaseMessage[]) => {
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
