import { useState, useTransition, type FormEvent, type ReactNode } from 'react'
import { Button } from '@algoroot/ui/components/button'
import { Textarea } from '@algoroot/ui/components/textarea'
import { cn } from '@algoroot/ui/lib/utils'

interface ChatFormProps {
	isLoading: boolean
	onSubmit: (message: string) => void
	bottomSlot: ReactNode
}

export const ChatForm = ({
	isLoading,
	onSubmit,
	bottomSlot,
}: ChatFormProps) => {
	const [input, setInput] = useState('')
	const [isComposing, setIsComposing] = useState(false)

	const submitMessage = () => {
		if (!input.trim()) return
		onSubmit(input)
		setInput('')
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			if (isComposing || isLoading) return
			e.preventDefault()
			submitMessage()
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		submitMessage()
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value
		if (newValue === input) return
		setInput(newValue)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={cn('bg-card flex flex-col gap-2 rounded-lg p-2')}
		>
			<Textarea
				name="message"
				placeholder="저에 대해 무엇이든 물어보세요 :)"
				variant={'unstyled'}
				value={input}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onCompositionStart={() => setIsComposing(true)}
				onCompositionEnd={() => setIsComposing(false)}
				className="min-h-11"
			/>
			<div className="flex items-center justify-between gap-2 p-3">
				{bottomSlot}
				<Button
					type="submit"
					isLoading={isLoading}
					disabled={!input || isLoading}
					className="ml-auto"
				>
					보내기
				</Button>
			</div>
		</form>
	)
}
