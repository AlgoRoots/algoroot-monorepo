import type { ReactNode } from 'react'

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Walter_Turncoat } from 'next/font/google'

import {
	BasisHeader,
	BasisLayout,
	BasisMain,
	Icons,
	MenuLink,
	ThemeSwitcher,
} from '@algoroot/shared/components'

import { LogoLink } from '@/components/LogoSet'
import { EXTERNAL_LINK } from '@/lib/constants'

import { siteConfig } from '@/configs/site'
import { Providers } from '@/providers/providers'

import '../styles/styles.css'

const fontSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
})

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
})
const fontWalterTurncoat = Walter_Turncoat({
	subsets: ['latin'],
	variable: '--font-walter-turncoat',
	weight: ['400'],
})

/**
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
}

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [],
	authors: [
		{
			name: 'algoroot',
			url: siteConfig.url,
		},
	],
	openGraph: {
		type: 'website',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.url],
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
	icons: siteConfig.icons,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					name="msapplication-config"
					content="/favicon/browserconfig.xml"
				/>
			</head>
			<body
				className={`${fontSans.variable} ${fontMono.variable} ${fontWalterTurncoat.variable} font-sans antialiased`}
			>
				<Providers>
					<BasisLayout className="h-dvh overflow-hidden">
						<BasisHeader>
							<LogoLink href={'/'} />
							<div className="align-center flex gap-2 text-2xl">
								<MenuLink
									href={'/about'}
									className="font-walter-turncoat px-2"
									variant={'link'}
								>
									About me!
								</MenuLink>
								<MenuLink
									href={EXTERNAL_LINK.GITHUB_ITSME}
									variant={'outline'}
									size={'icon'}
								>
									<Icons.gitHub />
								</MenuLink>
								<ThemeSwitcher />
							</div>
						</BasisHeader>
						<BasisMain className="relative flex flex-col items-center justify-center overflow-hidden">
							{children}
						</BasisMain>
					</BasisLayout>
				</Providers>
			</body>
		</html>
	)
}
