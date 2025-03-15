import { type ComponentProps } from 'react'

import { ScrollArea } from '@algoroot/ui/components/scroll-area'
import { cn } from '@algoroot/ui/lib/utils'

interface ChatInterfaceProps extends ComponentProps<'div'> {}

const ChatInterface = ({ children }: ChatInterfaceProps) => {
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
interface ChatPresenTationProps extends ComponentProps<'div'> {}

const ChatPresenTation = ({ children, className }: ChatPresenTationProps) => {
	return (
		<ScrollArea
			className={cn(
				'h-0 min-h-0 w-full max-w-3xl flex-1 overflow-y-auto px-4 pt-4',
				className,
			)}
		>
			{children}
			{/* </div> */}
		</ScrollArea>
	)
}

export { ChatInterface, ChatPresenTation }
