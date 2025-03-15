import type { RefObject } from 'react'

export interface EventMap {
	'chat-scroll': { lastMessageRef: RefObject<HTMLDivElement> }
}
