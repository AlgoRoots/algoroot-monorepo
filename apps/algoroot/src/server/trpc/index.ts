import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import { type Context } from './context'

/**
 * @see https://trpc.io/docs/quickstart
 * trpc 초기화 (백엔드 당 한 번만 수행)
 *
 * @see https://trpc.io/docs/server/data-transformers#using-superjson
 * superjson을 transformer로 사용하여 날짜, Map, Set 등도 안전하게 직렬화
 */
const t = initTRPC.context<Context>().create({
	transformer: superjson,
})

export const router = t.router

export const procedures = {
	public: t.procedure,
}
