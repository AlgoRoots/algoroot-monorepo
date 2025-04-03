'use client'

import type { ReactNode } from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { TRPCReactProvider } from '@/modules/api/trpc/client'

import QueryErrorBoundary from '@/components/QueryErrorBoundary'
import { ChatProvider } from '@/contexts/ChatContext'

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
					<ChatProvider>
						{children}
						<ReactQueryDevtools initialIsOpen={false} />
					</ChatProvider>
				</QueryErrorBoundary>
			</TRPCReactProvider>
		</NextThemesProvider>
	)
}
