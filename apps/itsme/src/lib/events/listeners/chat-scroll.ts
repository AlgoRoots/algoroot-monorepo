import type { RefObject } from 'react'

export const handleChatScroll = ({
	messageRefs,
}: {
	messageRefs: RefObject<(HTMLDivElement | null)[]>
}) => {
	console.log('@@', messageRefs.current)
	const latestMessageIdx = messageRefs.current.length - 2
	if (latestMessageIdx < 0) return

	const latestMessageElement = messageRefs.current[latestMessageIdx]
	if (latestMessageElement) {
		latestMessageElement.scrollIntoView({
			block: 'start',
			behavior: 'smooth',
		})
	}
	window.scrollTo(0, 0)
}
