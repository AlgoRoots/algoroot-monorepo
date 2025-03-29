/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
	compiler: {
		removeConsole: isProd ? { exclude: ['error'] } : false,
	},
	transpilePackages: ['@algoroot/ui', '@algoroot/share'],
}

export default nextConfig
