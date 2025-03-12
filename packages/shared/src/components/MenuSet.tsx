import { Button, type ButtonVariants } from '@algoroot/ui/components/button'
import type { Route } from 'next'
import Link from 'next/link'
import React, { type HTMLAttributes } from 'react'

export interface MenuLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	href?: Route<string> | URL | string
	styleProps: ButtonVariants
}

const MenuLink = ({ href, children, styleProps, ...props }: MenuLinkProps) => {
	if (!href) {
		throw new Error('MenuLink: href is required')
	}

	const isExternal = typeof href === 'string' && href.startsWith('http')

	if (isExternal) {
		return (
			<a
				href={href.toString()}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				<Button asChild>{children}</Button>
			</a>
		)
	}

	return (
		<Button asChild {...styleProps}>
			<Link href={href as Route<string> | URL} {...props}>
				{children}
			</Link>
		</Button>
	)
}

export { MenuLink }
