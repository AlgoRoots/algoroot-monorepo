import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'HOME',
	description: 'algoroot',
}

export default async function Home() {
	return (
		<div>
			<div>algoroot</div>
		</div>
	)
}
