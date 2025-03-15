import { handleChatScroll } from './chat-scroll'

export const listeners = {
	chatScrollTrigger: handleChatScroll,
} as const
