import path from 'path'

import type { VectorDocument } from '../vector-store'

import { Document } from 'langchain/document'
import { TextLoader } from 'langchain/document_loaders/fs/text'

const extractTextFromMD = async (filePath: string) => {
	const loader = new TextLoader(filePath)
	const docs = await loader.load()
	return docs
}

export const getDocsFromMd = async (
	relativePath: string,
): Promise<VectorDocument[]> => {
	const filePath = path.join(process.cwd(), relativePath)
	const docs = await extractTextFromMD(filePath)

	if (!docs?.[0]?.pageContent) {
		return []
	}

	const text = docs[0].pageContent

	const sections = text.split(/(?=^#\s+)/gm)

	const documents: Document[] = sections
		.map((block) => block.trim())
		.filter(Boolean)
		.map((block) => {
			const header = block.split('\n')[0]?.replace(/^#\s+/, '').trim()

			return new Document({
				pageContent: block,
				metadata: {
					title: header,
				},
			})
		})

	return documents
}
