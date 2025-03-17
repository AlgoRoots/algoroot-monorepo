import type { Metadata } from 'next'

import ChatStartView from '@/components/Chat/ChatStartView'

export const metadata: Metadata = {
	title: 'HOME',
}

export default async function Home() {
	return <ChatStartView />
}
