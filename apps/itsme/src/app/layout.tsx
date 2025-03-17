import type { Metadata, Viewport } from 'next'
import { Head } from 'next/document'
import { Geist, Geist_Mono, Walter_Turncoat } from 'next/font/google'

import {
	BasisHeader,
	BasisLayout,
	BasisMain,
	Icons,
	MenuLink,
	ThemeSwitcher,
} from '@algoroot/shared/components'

import { LogoLink } from '@/components/LogoLink'
import { META_ICONS } from '@/lib/constants/meta-icons'

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
		default: "It's ME!",
		template: "%s | It's ME!",
	},
	description:
		'AI 기반 자기소개 챗봇으로, 저의 이력서와 포트폴리오 정보를 AI와 대화하며 쉽게 알아갈 수 있는 서비스입니다.',
	openGraph: {
		type: 'website',
		title: "It's ME!",
		description:
			'AI 기반 자기소개 챗봇으로, 저의 이력서와 포트폴리오를 대화형 AI를 통해 쉽게 알아갈 수 있는 서비스입니다.',
		url: 'http://localhost:3000', // TODO: update url
		siteName: "It's ME!",
		images: [
			{
				url: 'images/og-image.png',
				width: 1200,
				height: 630,
				alt: "It's ME! Chatbot",
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: "It's ME!",
		description: 'AI 자기소개 챗봇',
		images: ['images/og-image.png'], // Twitter 이미지 URL
	},
	icons: META_ICONS,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="msapplication-TileColor" content="#14181F" />
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
							<LogoLink href={'/'} subTitle="성혜 AI 자기소개" />
							<div className="align-center flex gap-4 text-2xl">
								<MenuLink
									href={'#'}
									styleProps={{ variant: 'outline', size: 'icon' }}
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
						<BasisMain className="relative flex flex-col items-center justify-center overflow-hidden px-4">
							{children}
						</BasisMain>
					</BasisLayout>
				</Providers>
			</body>
		</html>
	)
}
