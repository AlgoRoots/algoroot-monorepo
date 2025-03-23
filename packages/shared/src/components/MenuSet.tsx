import { type ComponentProps, type HTMLAttributes, type ReactNode } from 'react'

import type { Route } from 'next'
import Link from 'next/link'

import { Button, type ButtonVariants } from '@algoroot/ui/components/button'
import type { ClassName } from '@algoroot/ui/types/'

export interface MenuLinkProps extends ButtonVariants {
	linkProps?: ComponentProps<'a'>
	href: Route<string> | URL | string
	className?: string
	children: ReactNode
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

	const isExternal = typeof href === 'string' && href.startsWith('http')

	if (isExternal) {
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

	return (
		<Button asChild {...buttonProps}>
			<Link href={href} {...linkProps}>
				{children}
			</Link>
		</Button>
	)
}

export { MenuLink }
