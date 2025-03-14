import { Card, CardContent } from '@algoroot/ui/components/card'
import { ScrollArea } from '@algoroot/ui/components/scroll-area'
import { cn } from '@algoroot/ui/lib/utils'
import React, { type ComponentProps } from 'react'

interface ChatLayoutProps extends ComponentProps<'div'> {}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
	return (
		<section
			// className="border border-red-200"
			className="flex h-full w-full max-w-3xl flex-col items-center justify-center"
			aria-live="polite"
			aria-label="채팅 인터페이스"
		>
			{/* <div
				className="flex h-full flex-col items-center justify-center"
				role="main"
			> */}
			{children}
			{/* </div> */}
		</section>
	)
}

interface ChatFooterProps extends ComponentProps<'div'> {}

export const ChatFooter = ({ children }: ChatFooterProps) => {
	return (
		<footer
			aria-label="채팅 인풋"
			className={cn('bg-background sticky bottom-0 w-full space-y-3 py-6')}
		>
			{children}
		</footer>
	)
}
