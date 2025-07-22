import type { Metadata } from 'next'
import { EXTERNAL_LINK } from './links'


export type SiteConfig = {
	name: string
	description: string
	url: string
	ogImage: string
	links: {
		github: string
		github_repo: string
	}
	icons: Metadata['icons']
}

export const siteConfig: SiteConfig = {
	name: "AlgoRoot",
	description:
		'알고리즘이 모여있는 길!',
	url: EXTERNAL_LINK.WEB,
	ogImage: 'images/og-image.png',
	links: {
		github: EXTERNAL_LINK.GITHUB,
		github_repo: EXTERNAL_LINK.GITHUB_ALGOROOT,
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon/favicon-16x16.png',
		apple: '/favicon/apple-touch-icon.png',
	},
}
