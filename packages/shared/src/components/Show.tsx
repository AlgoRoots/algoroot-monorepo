import type { ReactNode } from 'react'

interface ShowProps {
	when: boolean
	children: ReactNode
	fallback?: ReactNode
}

export const Show = ({ when, children, fallback = null }: ShowProps) => {
	if (when) return children

	return fallback
}
