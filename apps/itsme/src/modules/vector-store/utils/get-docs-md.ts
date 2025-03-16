import path from 'path'

import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

/**
 *
 * @see https://js.langchain.com/docs/integrations/document_loaders/file_loaders/pdf/
 
* md header 분할로 헤더 기준으로 자르고 싶었지만 js에 없음
 * @see https://python.langchain.com/docs/how_to/markdown_header_metadata_splitter/
 * 
 *  RecursiveCharacterTextSplitter 로 문자열 자르기, 오버랩
 * seperators로 헤더 구분, 만약 좀 더 개선이 필요하면 UnstructuredLoader 써봐도 좋을 듯[ api key 필요함] (https://js.langchain.com/docs/how_to/document_loader_markdown/)
 * @see https://js.langchain.com/docs/how_to/recursive_text_splitter/
 */
const extractTextFromMD = async (filePath: string) => {
	// splitPages 각 페이지가 개별 문서로 저장됨 (검색 최적화 가능)
	const loader = new TextLoader(filePath)
	const docs = await loader.load()
	return docs
}

export const textSplitter = new RecursiveCharacterTextSplitter({
	chunkSize: 800,
	chunkOverlap: 200,
	separators: ['##'],
})

export const getDocsFromMd = async (relativePath: string) => {
	const filePath = path.join(process.cwd(), relativePath)

	const docs = await extractTextFromMD(filePath)

	const splitDocs = await textSplitter.splitDocuments(docs)
	return splitDocs
}
