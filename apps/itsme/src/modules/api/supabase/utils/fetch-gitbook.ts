import { SitemapLoader } from '@langchain/community/document_loaders/web/sitemap'
import { Document } from '@langchain/core/documents'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import puppeteer, { Page } from 'puppeteer'

import type { VectorDocument } from '../vector-store'

const SITEMAP_URL =
	'https://sunghyes-organization.gitbook.io/dev-portfolio/sitemap-pages.xml'

type DocumentResult = {
	url: string
	title: string
	main: string
}

export const fetchGitBookDocs = async (): Promise<VectorDocument[]> => {
	const loader = new SitemapLoader(SITEMAP_URL)
	const urls = await loader.parseSitemap()
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	const docs: Document[] = []
	for (const { loc: url } of urls) {
		const res = await fetchUrl(page, url)
		if (!res) continue

		const doc = toDocument(res)
		docs.push(doc)
		console.log(`✅ ${doc.metadata.title} 저장 완료`)
	}

	await browser.close()
	console.log(`📦 총 ${docs.length}개 문서 처리 완료`)
	return docs
}

const fetchUrl = async (
	page: Page,
	url: string,
): Promise<DocumentResult | null> => {
	try {
		await page.goto(url, { waitUntil: 'networkidle2' }) // 네트워크 요청이 거의 다 끝날 때까지 기다림
		const main = await page.$eval('main', (el) => el.innerHTML)
		return {
			title: (await page.title()) || '',
			main,
			url,
		}
	} catch (err) {
		console.warn(`❌ fetchUrl: ${url} 처리 에러 `, err)
		return null
	}
}

/**
 * md의 가장 상단을 label, path로 추출, metadata용도
 * 1. [Projects](/projects)
	 2. [참여한 프로젝트](/projects/introduction)
   3. [밀리의서재](/projects/introduction/millie)
 */
const extract = (md: string) => {
	const lines = md.split('\n')
	const splitIndex = lines.findIndex((line) => !line.trim())

	const categoryLines = lines.slice(0, splitIndex)
	const contentLines = lines.slice(splitIndex + 1)

	const source = categoryLines.map((line) => {
		const [labelPart, pathPart] = line.split('](')
		const label = labelPart?.split('[')[1]?.trim() || ''
		const path = pathPart?.replace(/\)$/, '').trim() || ''
		return { label, path }
	})

	const contentOnly = contentLines.join('\n').trim()

	return {
		source,
		content: contentOnly,
	}
}

const toDocument = ({ title, main, url }: DocumentResult): VectorDocument => {
	const md = NodeHtmlMarkdown.translate(main)
	const newMd = extract(md)

	return new Document({
		pageContent: newMd.content,
		metadata: {
			title,
			url,
			source: newMd.source,
		},
	})
}
