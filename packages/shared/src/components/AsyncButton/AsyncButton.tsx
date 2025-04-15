'use client'

import { type ComponentProps, useCallback, useRef } from 'react'

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
	const isProcessing = useRef(false)

	const handleClick = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			if (isProcessing.current) return

			isProcessing.current = true
			try {
				await onClick?.(e)
			} finally {
				isProcessing.current = false
			}
		},
		[onClick],
	)

	return (
		<Button
			disabled={isProcessing.current || disabled}
			onClick={handleClick}
			{...props}
		>
			{children}
		</Button>
	)
}
