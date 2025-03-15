import type { ReactNode } from 'react'

type IfProps = {
	condition: boolean
	onTrue: ReactNode
	onFalse: ReactNode
}
export const If = ({ condition, onTrue, onFalse }: IfProps) => {
	if (condition) return onTrue
	if (!condition) return onFalse
	return null
}
