import { cn } from '@algoroot/ui/lib/utils'
import ReactMarkdown from 'react-markdown'

export type ChatMessageProps = {
	role: 'user' | 'ai'
	content: string
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
	// console.log("run", content);
	return (
		<div
			className={cn(
				'my-2 flex',
				role === 'user' ? 'justify-end' : 'justify-start',
			)}
		>
			<div
				className={cn(
					'max-w-md rounded-lg px-4 py-2',
					role === 'user' ?
						'bg-primary text-primary-foreground'
					:	'bg-secondary text-secondary-foreground',
				)}
			>
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
		</div>
	)
}
