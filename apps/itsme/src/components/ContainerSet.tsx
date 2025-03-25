import type { ComponentProps, ReactNode } from 'react'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@algoroot/ui/components/card'

const Container = ({ children }: ComponentProps<'div'>) => {
	return (
		<div className="mx-auto max-w-4xl space-y-6 px-6 py-12">{children}</div>
	)
}

const Section = ({
	title,
	children,
}: Omit<ComponentProps<'div'>, 'title'> & { title: ReactNode }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-semibold">{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}

export { Container, Section }
