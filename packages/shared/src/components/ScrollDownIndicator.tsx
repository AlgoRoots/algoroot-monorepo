import type { ComponentProps } from 'react'

import { Button } from '@algoroot/ui/components/button'
import { cn } from '@algoroot/ui/lib/utils'
import { ArrowDownIcon } from 'lucide-react'

interface ScrollDownIndicatorProps extends ComponentProps<'button'> {
	isHide?: boolean
}
export const ScrollDownIndicator = ({
	className,
	isHide,
	...props
}: ScrollDownIndicatorProps) => {
	return (
		<div className="opacity-100 will-change-auto">
			<Button
				variant={'outline'}
				size={'icon'}
				className={cn(
					isHide && 'hidden', //
					'absolute bottom-5 right-1/2 z-10 translate-x-1/2',
					'rounded-full opacity-80',
					className,
				)}
				{...props}
			>
				<ArrowDownIcon />
			</Button>
		</div>
	)
}
