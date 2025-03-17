'use client'

import { useState } from 'react'

import { Textarea } from '@algoroot/ui/components/textarea'

import { useChatActionContext } from './context/useChatAction'

export const ChatActionInput = () => {
	const action = useChatActionContext()

	const [isComposing, setIsComposing] = useState(false)

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			if (isComposing || action.isDisable) return
			e.preventDefault()
			action.onSubmit?.()
		}
	}

	return (
		<Textarea
			name="message"
			placeholder="저에 대해 무엇이든 물어보세요 :)"
			variant={'unstyled'}
			value={action.value}
			onChange={action.onChange}
			onKeyDown={handleKeyDown}
			onCompositionStart={() => setIsComposing(true)}
			onCompositionEnd={() => setIsComposing(false)}
		/>
	)
}
