import type { Metadata } from 'next'

import { EXTERNAL_LINK } from '@/lib/constants'

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
	name: "It's ME!",
	description:
		'AI 기반 자기소개 챗봇으로, 저의 이력서와 포트폴리오 정보를 AI와 대화하며 쉽게 알아갈 수 있는 서비스입니다.',
	url: EXTERNAL_LINK.WEB,
	ogImage: 'images/og-image.png',
	links: {
		github: EXTERNAL_LINK.GITHUB,
		github_repo: EXTERNAL_LINK.GITHUB_ITSME,
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon/favicon-16x16.png',
		apple: '/favicon/apple-touch-icon.png',
	},
}
