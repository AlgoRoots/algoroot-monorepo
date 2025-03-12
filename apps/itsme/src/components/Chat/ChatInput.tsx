import { Button } from '@algoroot/ui/components/button'
import { Input } from '@algoroot/ui/components/input'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface ChatInputProps {
	isLoading: boolean
	onSend: (message: string) => void
}

const ChatInput = ({ isLoading, onSend }: ChatInputProps) => {
	const [input, setInput] = useState('')

	const handleSend = () => {
		if (!input.trim()) return
		onSend(input)
		setInput('')
	}

	return (
		<div className="flex items-center gap-2">
			<Input
				name="message"
				placeholder="질문을 입력하세요..."
				className="flex-1"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && handleSend()}
			/>
			<Button type="button" onClick={handleSend} disabled={isLoading}>
				{isLoading ?
					<Loader2 className="animate-spin" />
				:	'보내기'}
			</Button>
		</div>
	)
}

export default ChatInput
