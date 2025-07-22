/* eslint-disable no-undef */
import NextBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */

const branch = process.env.VERCEL_GIT_BRANCH || 'local'

const isProd = process.env.NODE_ENV === 'production' && branch === 'main'

const nextConfig = {
	compiler: {
		removeConsole: isProd ? { exclude: ['error'] } : false,
	},
	modularizeImports: {
		'lodash-es': {
			transform: 'lodash-es/{{member}}',
			preventFullImport: true,
		},
		'lodash/fp': {
			transform: 'lodash/fp/{{member}}',
			preventFullImport: true,
		},
	},
	transpilePackages: ['@algoroot/ui', '@algoroot/share'],
	async redirects() {
		return [
			{
				source: '/:path((?!ie11_warning.html$).*)',
				has: [
					{
						type: 'header',
						key: 'User-Agent',
						value: '(.*Trident.*)',
					},
				],
				permanent: false,
				destination: '/ie_warning.html',
			},
		]
	},
	async headers() {
		return [
			{
				source: '/site.webmanifest',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/favicon/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		]
	},
}
const withBundlerAnlayzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})
export default withBundlerAnlayzer(nextConfig)
