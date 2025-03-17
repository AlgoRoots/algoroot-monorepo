import type { RefObject } from 'react'

export const handleChatScroll = ({
	messageRefs,
	behavior,
}: {
	messageRefs: RefObject<(HTMLElement | null)[]>
	behavior: 'instant' | 'smooth'
}) => {
	const latestMessageIdx = messageRefs.current.length - 2
	if (latestMessageIdx < 0) return

	const latestMessageElement = messageRefs.current[latestMessageIdx]
	if (latestMessageElement) {
		latestMessageElement.scrollIntoView({
			block: 'start',
			behavior: behavior,
		})
	}
	window.scrollTo(0, 0)
}
