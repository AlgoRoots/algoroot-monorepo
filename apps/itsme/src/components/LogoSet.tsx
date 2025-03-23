import type { AnchorHTMLAttributes } from 'react'

import Link from 'next/link'

import { cn } from '@algoroot/ui/lib/utils'

const LogoLink = ({
	href,
	className,
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string
}) => {
	return (
		<Link
			href={href}
			className={cn('font-walter-turncoat text-2xl font-bold', className)}
		>
			<Logo />
		</Link>
	)
}

const Logo = ({ className }: { className?: string }) => {
	return (
		<div className={cn('font-walter-turncoat text-2xl font-bold', className)}>
			It<span className="text-primary font-extrabold">'</span>s{' '}
			<span className="text-primary">ME!</span>
		</div>
	)
}

export { Logo, LogoLink }
