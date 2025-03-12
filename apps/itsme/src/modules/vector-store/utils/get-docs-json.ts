import path from 'path'
import fs from 'fs'

import type { VectorDocument } from '../lib/vector-store'
import { isArray } from 'lodash-es'

export type Question = {
	pageContent: string
	metadata: {
		category: string
		keywords: string[]
	}
}

/**
 * JSON 파일에서 질문 데이터 가져오기
 */
export const getDocsFromJson = (relativePath: string): VectorDocument[] => {
	try {
		const filePath = path.join(process.cwd(), relativePath)
		const fileContent = fs.readFileSync(filePath, 'utf-8')
		const data: Question[] = JSON.parse(fileContent)
		if (!isArray(data)) {
			throw new Error('JSON 형식이 잘못되었습니다.')
		}
		return data
	} catch (error) {
		throw new Error(`파일을 읽는 중 오류 발생: ${(error as Error).message}`)
	}
}
