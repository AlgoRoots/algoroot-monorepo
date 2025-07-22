import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'

/**
 * QueryClient 인스턴스 생성하는 함수
 */
export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
			dehydrate: {
				// pending 상태의 쿼리도 dehydrate
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === 'pending',
			},
		},
	})
}
