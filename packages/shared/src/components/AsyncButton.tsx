'use client'

import { type ComponentProps, useCallback, useRef } from 'react'

import { Button, type ButtonVariants } from '@algoroot/ui/components/button'

interface AsyncButtonProps
	extends Omit<ComponentProps<'button'>, 'onClick'>,
		ButtonVariants {
	onClick: () => Promise<void>
}

export const AsyncButton = ({
	children,
	onClick,
	...props
}: AsyncButtonProps) => {
	const isProcessing = useRef(false)

	const handleClick = useCallback(async () => {
		if (isProcessing.current) return

		isProcessing.current = true
		try {
			await onClick()
		} finally {
			isProcessing.current = false
		}
	}, [onClick])

	return (
		<Button disabled={isProcessing.current} onClick={handleClick} {...props}>
			{children}
		</Button>
	)
}
