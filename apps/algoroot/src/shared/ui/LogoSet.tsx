import type { AnchorHTMLAttributes } from 'react'

import type { Route } from 'next'
import Link from 'next/link'

import { cn } from '@algoroot/ui/lib/utils'

function LogoLink({
	href,
	className,
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: Route<string> | URL
}) {
	return (
		<Link
			href={href}
			className={cn('font-walter-turncoat text-2xl font-bold', className)}
		>
			<Logo />
		</Link>
	)
}

function Logo({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'font-walter-turncoat text-primary text-2xl font-bold',
				className,
			)}
		>
			Algo<span className="text-foreground">Root</span>
		</div>
	)
}

export { Logo, LogoLink }
