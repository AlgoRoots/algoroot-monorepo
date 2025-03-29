'use client'

import { useState } from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getQueryClient } from '@/modules/api/react-query/client'
import { getTrpcClient, TRPCProvider } from '@/modules/api/trpc/client'

import QueryErrorBoundary from '@/components/QueryErrorBoundary'
import { ChatProvider } from '@/contexts/ChatContext'

export function Providers({ children }: { children: React.ReactNode }) {
	const [qc] = useState(() => getQueryClient())
	const [tc] = useState(() => getTrpcClient())
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			<QueryClientProvider client={qc}>
				<TRPCProvider trpcClient={tc} queryClient={qc}>
					<QueryErrorBoundary>
						<ChatProvider>
							{children}
							<ReactQueryDevtools initialIsOpen={false} />
						</ChatProvider>
					</QueryErrorBoundary>
				</TRPCProvider>
			</QueryClientProvider>
		</NextThemesProvider>
	)
}
