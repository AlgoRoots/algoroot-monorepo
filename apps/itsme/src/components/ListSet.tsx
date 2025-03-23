import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@algoroot/ui/lib/utils'

type ListType = 'dash' | 'dot' | 'number'

interface ListProps<T extends ReactNode> extends ComponentProps<'ul'> {
	items: T[]
	listType?: ListType
}

const List = <T extends ReactNode>({
	items,
	listType = 'dash',
	className,
	...props
}: ListProps<T>) => {
	const getPrefix = (index: number) => {
		switch (listType) {
			case 'dot':
				return '•'
			case 'number':
				return `${index + 1}.`
			default:
				return '-'
		}
	}

	return (
		<ul className={cn('space-y-1 pl-2 text-sm', className)} {...props}>
			{items.map((item, index) => (
				<li key={index} className="flex items-start">
					<span className="mr-2">{getPrefix(index)}</span>
					<span>{item}</span>
				</li>
			))}
		</ul>
	)
}

export { List }
