import { type ComponentProps, type FormEvent } from 'react'

import { cn } from '@algoroot/ui/lib/utils'

import { useChatActionContext } from './context/useChatAction'

export const ChatActionForm = ({ children }: ComponentProps<'form'>) => {
	const action = useChatActionContext()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		action.onSubmit()
	}
	return (
		<form
			onSubmit={handleSubmit}
			aria-labelledby="chat-input-label"
			className={cn(
				'bg-card mx-auto mb-4 mt-4 flex w-full max-w-3xl flex-col gap-2 rounded-lg p-2',
			)}
		>
			<h2 id="chat-input-label" className="sr-only">
				채팅 입력창
			</h2>
			{children}
		</form>
	)
}
