import React, { cache, Suspense } from 'react'

import {
	defaultShouldDehydrateQuery,
	dehydrate,
	HydrationBoundary,
} from '@tanstack/react-query'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { type TRPCQueryOptions } from '@trpc/tanstack-react-query'
import 'server-only'

// <-- ensure this file cannot be imported from the client

import { makeQueryClient } from '../react-query/client'
import { createContext } from './context'
import { appRouter } from './router'

/**
 * Sever Component
 * @see https://trpc.io/docs/client/tanstack-react-query/server-components#using-your-api
 */
/**
 * @see https://trpc.io/docs/client/tanstack-react-query/server-components#getting-data-in-a-server-component
 */
export const serverApi = appRouter.createCaller(createContext)

export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
	ctx: createContext,
	router: appRouter,
	queryClient: getQueryClient,
})

export function HydrateClient(props: {
	children: React.ReactNode
	fallback?: React.ReactNode
}) {
	const queryClient = getQueryClient()

	const dehydratedState = dehydrate(queryClient, {
		shouldDehydrateQuery: (query) =>
			defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
	})

	return (
		<HydrationBoundary state={dehydratedState}>
			<Suspense fallback={props.fallback ?? null}>{props.children}</Suspense>
		</HydrationBoundary>
	)
}
export async function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
	queryOptions: T | T[],
) {
	const queryClient = getQueryClient()
	const prefetchQuery = (query: T) => {
		if (query.queryKey[1]?.type === 'infinite') {
			return queryClient.prefetchInfiniteQuery(query as any)
		}
		return queryClient.prefetchQuery(query)
	}

	if (Array.isArray(queryOptions)) {
		await Promise.all(queryOptions.map(prefetchQuery))
		return
	}

	await prefetchQuery(queryOptions)
}
