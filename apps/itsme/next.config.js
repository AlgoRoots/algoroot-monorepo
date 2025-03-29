/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const removeConsole = (() => {
	const isServer = typeof window === 'undefined'
	const isClient = !isServer
	if (!isProd) return false
	if (isClient) return { exclude: ['error'] }
	if (isServer) return false
})()

const nextConfig = {
	compiler: {
		removeConsole,
	},
	transpilePackages: ['@algoroot/ui', '@algoroot/share'],
}

export default nextConfig
