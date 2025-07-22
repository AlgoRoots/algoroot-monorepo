import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

/**
 * createContext를 통해 요청 객체 및 헤더 정보를 포함한 컨텍스트 구성
 * 사용자 ip 정보를 위해 사용
 */
export const createContext = async (opts?: FetchCreateContextFnOptions) => {
	return {
		headers: opts?.resHeaders,
		request: opts?.req,
	}
}
export type Context = Awaited<ReturnType<typeof createContext>>
