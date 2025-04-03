import { ChatOpenAI } from '@langchain/openai'
import { TRPCError } from '@trpc/server'
import { isEmpty } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { supabaseClient } from '@/modules/api/supabase/client'
import { fetchGitBookDocs } from '@/modules/api/supabase/utils/fetch-gitbook'
import { getDocsFromJson } from '@/modules/api/supabase/utils/get-docs-json'
import { getDocsFromMd } from '@/modules/api/supabase/utils/get-docs-md'
import {
	type VectorDocument,
	vectorStore,
} from '@/modules/api/supabase/vector-store'

import { getKSTDay } from '@/utils/date'

import { procedures, router } from '.'

const FILE_PATH = 'public/data/docs.json'
const RESUME_PATH = 'public/data/resume.md'

const DAILY_LIMIT = 50
const ME = '::1'

const model = new ChatOpenAI({
	model: 'gpt-4o-mini',
})

export const appRouter = router({
	/**
	 * @query - IP 가져오기
	 */
	getIP: procedures.public.query(({ ctx }) => {
		const ip = ctx.request?.headers.get('x-forwarded-for') || uuidv4()
		return { ip }
	}),

	/**
	 * @query - 현재 IP의 사용량 조회
	 * @param ip: 조회 할 ip
	 * @optional day: 조회할 날짜 (선택값) default 요청 시점 한국 날짜
	 */
	getIpUsage: procedures.public
		.input(z.object({ ip: z.string(), day: z.string().optional() }))
		.query(async ({ input }) => {
			const { ip, day = getKSTDay() } = input

			const { data } = await supabaseClient
				.from('ip_question_count')
				.select('ip, date, count')
				.eq('ip', ip)
				.eq('date', day)
				.maybeSingle()

			const result = {
				ip,
				date: day,
				count: data?.count ?? 0,
				isMax: (data?.count ?? 0) >= DAILY_LIMIT && ip !== ME,
			}

			return result
		}),

	/**
	 * @mutation ip count 증가 (max limit 5)
	 * @param ip: 조회 할 ip
	 * @optional day: 조회할 날짜 (선택값) default 요청 시점 한국 날짜
	 */
	addIpCount: procedures.public
		.input(z.object({ ip: z.string(), day: z.string().optional() }))
		.mutation(async ({ input }) => {
			const { ip, day = getKSTDay() } = input

			const { data } = await supabaseClient
				.from('ip_question_count')
				.select('count')
				.eq('ip', ip)
				.eq('date', day)
				.maybeSingle()

			const curCount = data?.count || 0
			if (curCount >= DAILY_LIMIT && ip !== ME) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: `하루 최대 ${DAILY_LIMIT}개의 질문만 가능합니다.`,
				})
			}

			const updatedCount = curCount + 1

			await supabaseClient
				.from('ip_question_count')
				.upsert(
					{ ip, date: day, count: updatedCount },
					{ onConflict: 'ip,date' },
				)
			return { count: updatedCount }
		}),

	/**
	 * @mutation - 문서 초기화
	 */
	clearDocuments: procedures.public.mutation(() => {
		try {
			return supabaseClient.from('questions').delete().gt('id', -1)
		} catch (err) {
			throw new Error(`DB 삭제 중 오류 발생`)
		}
	}),
	/**
	 * @mutation - 벡터 DB에 문서 추가
	 * 아래 경로의 데이터를 불러와 Supabase Vector Store에 임베딩
	 * - JSON 형식 자기소개 데이터
	 * - Markdown 형식 이력서 데이터
	 * - GitBook에서 크롤링한 웹 문서
	 */
	addDocuments: procedures.public.mutation(async () => {
		const jsonDocs = getDocsFromJson(FILE_PATH)
		const mdDocs = await getDocsFromMd(RESUME_PATH)
		const webDocs = await fetchGitBookDocs()
		const newDocuments: VectorDocument[] = jsonDocs.concat(mdDocs, webDocs)

		if (isEmpty(newDocuments)) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: `추가할 새로운 데이터가 없습니다.`,
			})
		}

		return vectorStore.addDocuments(
			newDocuments.map(({ pageContent, metadata }, idx) => ({
				pageContent,
				metadata,
				id: String(idx),
			})),
		)
	}),

	/**
	 * @query 제안 질문 가져오기
	 */
	getSuggestQuestions: procedures.public.query(async () => {
		const res = await supabaseClient
			.from('question_suggestions')
			.select('*')
			.order('id', { ascending: true })
		return res.data || []
	}),
})

export type AppRouter = typeof appRouter
