'use client'

import { useCallback, useMemo, useState } from 'react'

import { createContext } from '@algoroot/shared/utils'

export interface ChatActionReturnValue {
	onSubmit: (value: string) => void
}

export type UseChatActionProps = {
	isDisable: boolean
	onSubmit?: (value: string) => Promise<void>
}
const initialProps: UseChatActionProps = {
	isDisable: false,
}

export const useChatAction = ({
	isDisable: _isDisable,
	onSubmit,
}: UseChatActionProps = initialProps) => {
	const [value, setValue] = useState('')

	const handleChangeValue = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const newValue = e.target.value
			if (newValue === value) return
			setValue(newValue)
		},
		[value],
	)

	const handleSubmit = useCallback(() => {
		if (!value.trim()) return
		onSubmit?.(value)
		setValue('')
	}, [onSubmit, value])

	const result = useMemo(() => {
		return {
			value,
			onChange: handleChangeValue,
			onSubmit: handleSubmit,
			isDisable: _isDisable,
		}
	}, [_isDisable, handleChangeValue, handleSubmit, value])

	return result
}

export const [ChatActionProvider, useChatActionContext, ChatActionContext] =
	createContext<ReturnType<typeof useChatAction>, UseChatActionProps>(
		useChatAction,
	)
