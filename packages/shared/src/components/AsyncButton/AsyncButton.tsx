'use client'

import { type ComponentProps, useCallback, useState } from 'react'

import { Button, type ButtonProps } from '@algoroot/ui/components/button'

export interface AsyncButtonProps
	extends Omit<ComponentProps<'button'>, 'onClick'>,
		ButtonProps {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export const AsyncButton = ({
	children,
	disabled,
	onClick,
	...props
}: AsyncButtonProps) => {
	const [isProcessing, setIsProcessing] = useState(false)

	const handleClick = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			if (isProcessing) return

			setIsProcessing(true)
			try {
				await onClick?.(e)
			} finally {
				setIsProcessing(false)
			}
		},
		[onClick, isProcessing],
	)

	return (
		<Button
			disabled={isProcessing || disabled}
			onClick={handleClick}
			{...props}
		>
			{children}
		</Button>
	)
}
