import { MenuLink } from '@algoroot/shared/components'

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
			<h2 className="text-3xl font-bold">404 - Not Found</h2>
			<p>찾으시는 페이지를 찾을 수 없습니다.</p>
			<MenuLink href={'/'} variant={'outline'}>
				홈으로 돌아가기
			</MenuLink>
		</div>
	)
}
