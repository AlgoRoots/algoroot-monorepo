import { NextResponse } from 'next/server'

import { serverApi } from '@/server/trpc/server'

/**
 * 질문 데이터 추가 API
 */
export async function POST() {
	try {
		await serverApi.clearDocuments().then(() => console.log('db clear 성공'))
		await serverApi.addDocuments()
		return NextResponse.json({ message: '문서 추가 완료' }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}
