import { type ComponentProps } from 'react'

import { ScrollArea } from '@algoroot/ui/components/scroll-area'
import { cn } from '@algoroot/ui/lib/utils'

interface ChatLayoutProps extends ComponentProps<'div'> {}

const ChatLayout = ({ children }: ChatLayoutProps) => {
	return (
		<div
			className="flex h-full w-full flex-col items-center justify-center overflow-hidden"
			aria-live="polite"
			aria-label="채팅 인터페이스"
		>
			{/* <div
				className="flex h-full flex-col items-center justify-center"
				role="main"
			> */}
			{children}
			{/* </div> */}
		</div>
	)
}
interface ChatPresentationProps extends ComponentProps<'div'> {}

const ChatPresentation = ({ children, className }: ChatPresentationProps) => {
	return (
		<ScrollArea className={cn('h-0 min-h-0 w-full flex-1 px-4', className)}>
			<div className="mx-auto max-w-4xl flex-1"> {children}</div>
		</ScrollArea>
	)
}

export { ChatLayout, ChatPresentation }
