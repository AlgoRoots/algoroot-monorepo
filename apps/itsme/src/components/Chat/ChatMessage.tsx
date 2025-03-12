import { cn } from '@algoroot/ui/lib/utils'
import ReactMarkdown from 'react-markdown'

export type ChatMessageProps = {
	role: 'user' | 'ai'
	content: string
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
	// console.log("run", content);
	return (
		<div
			className={cn(
				'flex my-2',
				role === 'user' ? 'justify-end' : 'justify-start',
			)}
		>
			<div
				className={cn(
					'px-4 py-2 rounded-lg max-w-md',
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

export default ChatMessage
