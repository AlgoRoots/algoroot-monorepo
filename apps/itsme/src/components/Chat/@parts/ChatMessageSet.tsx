import type { ComponentProps } from 'react'

import { cn } from '@algoroot/ui/lib/utils'
import ReactMarkdown from 'react-markdown'

interface ChatMessageProps extends ComponentProps<'div'> {
	role: 'user' | 'ai'
	content: string
}

const ChatMessage = ({ role, content, className }: ChatMessageProps) => {
	// console.log("run", content);
	return (
		<div
			className={cn(
				'my-10 w-fit max-w-md rounded-lg bg-red-100 px-4 py-2 md:my-6',
				role === 'user' ?
					'bg-primary text-primary-foreground ml-auto'
				:	'bg-secondary text-secondary-foreground mr-auto',
				className,
			)}
		>
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	)
}

const ChatStartMessage = () => {
	return (
		<div className="mx-auto mb-6 w-full">
			<p className="text-card-foreground text-center text-2xl font-bold md:text-3xl">
				대화를 시작하세요!
			</p>
		</div>
	)
}

export { ChatMessage, ChatStartMessage }
