'use client'

import { type ReactNode, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import superjson from 'superjson'

import { makeQueryClient } from './query-client'
import type { AppRouter } from './router'

/**
 * trpc context provider 설정
 * @see https://trpc.io/docs/client/tanstack-react-query/setup#3a-setup-the-trpc-context-provider
 */
export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<AppRouter>()

/**
 * Query Client
 */
let browserQueryClient: QueryClient | undefined

function getQueryClient() {
	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}

/**
 * tRPC Client
 */
const getTrpcClient = () => {
	return createTRPCClient<AppRouter>({
		links: [
			httpBatchLink({
				url: '/api/trpc',
				transformer: superjson,
			}),
		],
	})
}

export const TRPCReactProvider = ({ children }: { children: ReactNode }) => {
	const [qc] = useState(() => getQueryClient())
	const [tc] = useState(() => getTrpcClient())

	return (
		<QueryClientProvider client={qc}>
			<TRPCProvider trpcClient={tc} queryClient={qc}>
				{children}
			</TRPCProvider>
		</QueryClientProvider>
	)
}
