import { type ComponentProps, type ReactNode } from 'react'

import { v4 as uuidv4 } from 'uuid'

interface ListRendererProps<T> extends ComponentProps<'ul'> {
	data: T[]
	render: (item: T, index: number) => ReactNode
	keyExtractor?: (item: T, index: number) => string | number
}

export const ListRenderer = <T,>({
	data,
	render,
	keyExtractor = (_, index) => uuidv4(),
	...props
}: ListRendererProps<T>) => {
	return (
		<ul {...props}>
			{data?.map((item, index) => (
				<li key={keyExtractor(item, index)}>{render(item, index)}</li>
			))}
		</ul>
	)
}
