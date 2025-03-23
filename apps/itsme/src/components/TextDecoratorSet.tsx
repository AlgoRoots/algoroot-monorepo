import type { ComponentProps } from 'react'

import { cn } from '@algoroot/ui/lib/utils'

const Highlight = ({
	children,
	className,
	...props
}: ComponentProps<'span'>) => {
	return (
		<span className={cn('text-primary! text-bold', className)} {...props}>
			{children}
		</span>
	)
}

export { Highlight }
