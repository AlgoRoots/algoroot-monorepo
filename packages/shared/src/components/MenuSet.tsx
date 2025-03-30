import { type ComponentProps, type ReactNode } from 'react'

import type { Route } from 'next'
import Link from 'next/link'

import { Button, type ButtonVariants } from '@algoroot/ui/components/button'

export interface MenuLinkProps extends ButtonVariants {
	linkProps?: ComponentProps<'a'>
	href: Route<string> | URL | string
	className?: string
	children: ReactNode
}

const isInternalRoute = (href: unknown): href is Route => {
	return typeof href === 'string' && href.startsWith('/')
}
const MenuLink = ({
	href,
	children,
	linkProps,
	...buttonProps
}: MenuLinkProps) => {
	if (!href) {
		throw new Error('MenuLink: href is required')
	}

	if (isInternalRoute(href)) {
		return (
			<Button asChild {...buttonProps}>
				<Link href={href} {...linkProps}>
					{children}
				</Link>
			</Button>
		)
	}

	return (
		<Button asChild {...buttonProps}>
			<a
				href={href.toString()}
				target="_blank"
				rel="noopener noreferrer"
				{...linkProps}
			>
				{children}
			</a>
		</Button>
	)
}

export { MenuLink }
