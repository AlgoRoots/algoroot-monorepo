import { type ComponentProps, memo, type ReactNode } from 'react'

import { LoadingView, Show } from '@algoroot/shared/components'
import { Button } from '@algoroot/ui/components/button'
import { cn } from '@algoroot/ui/lib/utils'
import { CircleIcon } from 'lucide-react'

import { Markdown, proseStyles } from '@/components/Markdown'

import type { Message } from '@/app/actions/chat'

interface ChatMessageProps extends ComponentProps<'div'>, Message {
	role: 'user' | 'ai'
	content: string
	isLoading: boolean
	fallback?: ReactNode
	onRetry?: () => void
}

const ChatMessageComponent = ({
	role,
	content,
	type,
	className,
	isLoading,
	onRetry,
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
					// md styles
					proseStyles,
					className,
				)}
			>
				<Markdown>{content}</Markdown>
				<Show when={type === 'error' && role ==='ai'}>
					<div className="bg-muted prose-p:m-0 flex flex-col items-center justify-center gap-2 p-0 px-2 py-2 md:flex-row md:px-2">
						<p className="text-muted-foreground text-sm">
							답변에 문제가 있습니다.
						</p>
						<Button
							variant="outline"
							size="sm"
							className="w-full md:w-fit"
							onClick={onRetry}
						>
							다시 시도하기
						</Button>
					</div>
				</Show>
			</div>
		</LoadingView>
	)
}

const ChatMessage = memo(ChatMessageComponent)

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

export { ChatMessage, ChatMessageSpinner, ChatStartMessage }
