'use client'

import type { ReactNode } from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { TRPCReactProvider } from '@/server/trpc/client'
import { QueryErrorBoundary } from '@/shared/ui'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			<TRPCReactProvider>
				<QueryErrorBoundary>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryErrorBoundary>
			</TRPCReactProvider>
		</NextThemesProvider>
	)
}
