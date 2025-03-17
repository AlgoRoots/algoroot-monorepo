import { type ComponentProps, type ReactNode } from 'react'

interface ListRendererProps<T> extends ComponentProps<'ul'> {
	data: T[]
	render: (item: T, index: number) => ReactNode
}

export const ListRenderer = <T,>({
	data,
	render,
	...props
}: ListRendererProps<T>) => {
	return (
		<ul {...props}>
			{data?.map((item, index) => <li key={index}>{render(item, index)}</li>)}
		</ul>
	)
}
