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

// const fontJua = Jua({
// 	subsets: ['latin'],
// 	variable: '--font-jua',
// 	weight: ['400'],
// })

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
			url: 'https://shadcn.com',
		},
	],
	openGraph: {
		type: 'website',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
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
									href={'/about-me'}
									className="font-walter-turncoat px-2"
									variant={'link'}
								>
									About me!
								</MenuLink>
								<MenuLink
									href={'#'}
									variant={'outline'}
									size={'icon'}
									// className="hover:*:text-white"
								>
									<Icons.gitHub />
								</MenuLink>
								<ThemeSwitcher />
							</div>
							{/* <ResponsiveRenderer
                breakpoint="md"
                below={
                  <div>
                    <Button variant={"secondary"} size={"icon"}>
                      <MenuIcon />
                    </Button>
                  </div>
                }
                above={
                  <div className="flex align-center text-2xl gap-3">
                    <MenuLink href={"#"}>
                      <Icons.gitHub />
                    </MenuLink>
                    <ThemeSwitcher />
                  </div>
                }
              /> */}
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
