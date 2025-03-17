import type { ReactNode } from 'react'

import type { Metadata } from 'next'

import { ChatLayout } from '@/components/Chat/@parts'

export const metadata: Metadata = {
	title: 'CHAT',
}

export default async function ChatViewLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return <ChatLayout>{children}</ChatLayout>
}
