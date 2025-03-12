import { cn } from '@algoroot/ui/lib/utils'
import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

export const LogoLink = ({
	href,
	subTitle,
	className,
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string
	subTitle?: string
}) => {
	return (
		<Link
			href={href}
			className={cn('font-walter-turncoat text-2xl font-bold', className)}
		>
			{/* It's ME! */}
			It<span className="text-primary font-extrabold">'</span>s{' '}
			<span className="text-primary">ME!</span>
			{/* <p className="font-jua text-primary text-sm">{subTitle}</p> */}
		</Link>
	)
}
