import { TRPCError } from '@trpc/server'
import { isEmpty } from 'lodash-es'

import { fetchGitBookDocs } from '@/server/doc-sync/fetch-gitbook'
import { getDocsFromJson } from '@/server/doc-sync/get-docs-json'
import { getDocsFromMd } from '@/server/doc-sync/get-docs-md'
import { supabaseClient } from '@/server/supabase/client'
import {
	type VectorDocument,
	vectorStore,
} from '@/server/supabase/vector-store'

import { procedures, router } from '.'

const FILE_PATH = 'public/data/docs.json'
const RESUME_PATH = 'public/data/resume.md'

const DAILY_LIMIT = 50
const ME = '::1'

export const appRouter = router({
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
