import { type ReactNode, Suspense } from 'react'

import { Skeleton } from '@algoroot/ui/components/skeleton'

export interface LoadingViewProps {
	isLoading?: boolean
	fallback?: ReactNode
	children: ReactNode
}

export const LoadingView = ({
	isLoading,
	children,
	fallback,
}: LoadingViewProps) => {
	if (isLoading === undefined) {
		return <Suspense fallback={fallback}>{children}</Suspense>
	}

	if (isLoading) {
		return fallback || <Skeleton />
	}

	return children
}
