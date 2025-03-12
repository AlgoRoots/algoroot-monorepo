import { type ReactNode } from 'react'

interface ListRendererProps<T> {
	data: T[]
	render: (item: T, index: number) => ReactNode
}

export const ListRenderer = <T,>({ data, render }: ListRendererProps<T>) => {
	return <>{data?.map((item, index) => render(item, index))}</>
}
