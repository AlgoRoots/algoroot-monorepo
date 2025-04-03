import { cache, type ReactNode, Suspense } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
	createTRPCOptionsProxy,
	type TRPCQueryOptions,
} from '@trpc/tanstack-react-query'
import 'server-only'

import { createContext } from './context'
import { makeQueryClient } from './query-client'
import { appRouter } from './router'

/**
 * 서버 호출자 만들기 (쿼리 클라이언트와 분리, 캐시데이터 저장 X)
 * @see https://trpc.io/docs/client/tanstack-react-query/server-components#getting-data-in-a-server-component
 */
export const serverApi = appRouter.createCaller(createContext)

// 서버 컴포넌트에서 같은 요청 내에서 fn의 반환값을 재사용할 수 있도록 캐싱
export const getQueryClient = cache(makeQueryClient)

/**
 * RSC 환경에서 tRPC 쿼리를 React Query 방식으로 prefetch하거나
 * 클라이언트에서 useQuery로 쓸 수 있는 queryOptions를 만들기 위한 프록시 객체.
 *
 * - `trpc.xxxx.queryOptions()` 형태로 서버/클라이언트 공통 쿼리 옵션 생성(공유)
 * - 서버 컴포넌트에서는 prefetchQuery 용도로 사용
 * - 클라이언트에서는 useQuery/useSuspenseQuery에 그대로 사용 가능
 *
 * @see https://trpc.io/docs/client/tanstack-react-query/server-components#5-create-a-trpc-caller-for-server-components
 */
export const trpc = createTRPCOptionsProxy({
	ctx: createContext,
	router: appRouter,
	queryClient: getQueryClient,
})

/**
 * 서버에서 캐싱된 데이터를 클라이언트에서 재사용 하기 위함
 * HydrationBoundary 직접 사용시에 대한 대안으로 좀 더 간결하게 사용하기 위해 생성하여 사용.
 */
export function HydrateClient(props: {
	children: ReactNode
	fallback?: ReactNode
}) {
	const queryClient = getQueryClient()

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={props.fallback ?? null}>{props.children}</Suspense>
		</HydrationBoundary>
	)
}

/**
 * prefetch 시 좀 더 간단하게 사용하기 위해 trpc에서 안내 한 helper 함수
 */
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
