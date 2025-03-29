import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import superjson from 'superjson'

import type { AppRouter } from './router'

export const getTrpcClient = () => {
	return createTRPCClient<AppRouter>({
		links: [
			httpBatchLink({
				url: '/api/trpc',
				transformer: superjson,
			}),
		],
	})
}

/**
 * trpc context provider 설정
 * @see https://trpc.io/docs/client/tanstack-react-query/setup#3a-setup-the-trpc-context-provider
 */
export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<AppRouter>()
