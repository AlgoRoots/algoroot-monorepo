import type { MetadataRoute } from 'next'

import { ENV } from '@/configs/env'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			disallow: '/', // TODO: 배포후 allow로 변경
		},
	}
}
