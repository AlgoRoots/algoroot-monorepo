import type { Metadata } from 'next'

export const META_ICONS: Metadata['icons'] = {
	icon: [
		{
			rel: 'apple-touch-icon',
			url: '/favicon/apple-icon-180x180.png',
			type: 'image/png',
			sizes: '180x180',
		},
		{
			rel: 'icon',
			url: '/favicon/favicon-32x32.png',
			type: 'image/png',
			sizes: '32x32',
		},
		{
			rel: 'icon',
			url: '/favicon/favicon-16x16.png',
			type: 'image/png',
			sizes: '16x16',
		},
		{
			rel: 'manifest',
			url: '/favicon/manifest.json',
		},
	],
}
