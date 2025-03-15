import { type ComponentProps, type FormEvent, useState } from 'react'

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
			className={cn(
				'bg-card mb-4 flex w-full max-w-3xl flex-col gap-2 rounded-lg p-2',
			)}
		>
			{children}
		</form>
	)
}
