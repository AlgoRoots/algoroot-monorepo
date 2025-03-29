'use client'

import { type PropsWithChildren, type ReactNode } from 'react'

import { Button } from '@algoroot/ui/components/button'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

const QueryErrorBoundary = ({
	children,
	fallbackRender = ErrorFallback,
}: PropsWithChildren<{
	fallbackRender?: (prop: FallbackProps) => ReactNode
}>) => {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
					{children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	)
}

export default QueryErrorBoundary

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div className="mx-auto flex h-screen w-full flex-col items-center justify-center px-4 text-center">
			<div className="gap-2">
				<h2 className="text-destructive text-2xl">문제가 발생했습니다</h2>
			</div>
			<p className="mb-8 mt-2 text-lg">
				예상치 못한 오류가 발생했습니다. 불편을 드려 죄송합니다.
			</p>
			<Button variant="destructive" onClick={resetErrorBoundary}>
				다시 시도하기
			</Button>
			{process.env.NODE_ENV === 'development' && (
				<pre className="mt-4 text-gray-500">{error.message}</pre>
			)}
		</div>
	)
}
