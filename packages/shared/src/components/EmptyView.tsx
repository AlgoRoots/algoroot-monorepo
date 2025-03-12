import type { ReactNode } from 'react'

interface EmptyViewProps {
	isEmpty: boolean
	children: ReactNode
	fallback?: ReactNode
}

export const EmptyView = ({
	isEmpty,
	children,
	fallback = <div>데이터가 없습니다.</div>,
}: EmptyViewProps) => {
	if (isEmpty) return fallback

	return children
}
