import * as React from 'react'

import { cn } from '@algoroot/ui/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const textAreaVariants = cva(
	'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
	{
		variants: {
			variant: {
				default: '',
				unstyled:
					'resize-none focus-visible:border-none focus-visible:ring-0 border-none shadow-none',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Textarea({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'textarea'> & VariantProps<typeof textAreaVariants>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(textAreaVariants({ variant, className }))}
			{...props}
		/>
	)
}

export { Textarea }
