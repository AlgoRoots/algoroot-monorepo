import type { ComponentProps, ReactNode } from 'react'

import { LoadingView } from '@algoroot/shared/components'
import { cn } from '@algoroot/ui/lib/utils'
import { CircleIcon } from 'lucide-react'

import { Markdown, proseStyles } from '@/components/Markdown'

import type { Message } from '@/app/actions/chat'

interface ChatMessageProps extends ComponentProps<'div'>, Message {
	role: 'user' | 'ai'
	content: string
	isLoading: boolean
	fallback?: ReactNode
}

const ChatMessage = ({
	role,
	content,
	type,
	className,
	isLoading,
	fallback = <ChatMessageSpinner />,
}: ChatMessageProps) => {
	return (
		<LoadingView isLoading={isLoading} fallback={fallback}>
			<div
				className={cn(
					'overflow-x-auto rounded-lg bg-red-100 px-3 py-2.5 md:px-4 md:py-3.5',
					role === 'user' ?
						'bg-primary text-primary-foreground ml-auto w-fit font-bold'
					:	'bg-secondary text-secondary-foreground mr-auto w-full',
					type === 'error' && 'bg-destructive',
					// md styles
					proseStyles,
					className,
				)}
			>
				<Markdown>{content}</Markdown>
			</div>
		</LoadingView>
	)
}

const ChatStartMessage = () => {
	return (
		<div className="mx-auto mb-6 w-full">
			<h1 className="text-card-foreground text-center text-2xl font-bold md:text-3xl">
				대화를 시작하세요!
			</h1>
		</div>
	)
}

const ChatMessageSpinner = () => {
	return (
		<div
			className={cn(
				'flex gap-1',
				'my-10 w-fit max-w-md rounded-lg px-4 py-2 md:my-6',
			)}
		>
			<CircleIcon className="fill-foreground size-1 animate-ping" />
			<CircleIcon className="fill-foreground size-1 animate-ping delay-200" />
			<CircleIcon className="fill-foreground size-1 animate-ping delay-500" />
		</div>
	)
}
export { ChatMessage, ChatStartMessage, ChatMessageSpinner }
