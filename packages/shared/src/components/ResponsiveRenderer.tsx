import {
	cloneElement,
	isValidElement,
	type PropsWithChildren,
	type ReactElement,
	type ReactNode,
} from 'react'

import { cn } from '@algoroot/ui/lib/utils'
import type { ClassName } from '@algoroot/ui/types/'

// type BreakPointKeys = keyof typeof config.theme.screens;
type BreakPointKeys = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
interface ResponsiveRendererProps {
	breakpoint?: BreakPointKeys
	below: ReactNode
	above: ReactNode
}

const visibilityVariants: Record<
	BreakPointKeys,
	{ below: ClassName; above: ClassName }
> = {
	sm: {
		below: 'block sm:hidden',
		above: 'hidden sm:block',
	},
	md: {
		below: 'block md:hidden',
		above: 'hidden md:block',
	},
	lg: {
		below: 'block lg:hidden',
		above: 'hidden lg:block',
	},
	xl: {
		below: 'block xl:hidden',
		above: 'hidden xl:block',
	},
	'2xl': {
		below: 'block 2xl:hidden',
		above: 'hidden 2xl:block',
	},
}

const renderWithClass = (
	element: ReactNode,
	className: ClassName,
): ReactNode => {
	if (isValidElement(element)) {
		const elementClassName =
			(element.props as { className?: string })?.className || ''

		const children = (element.props as { children?: ReactNode }).children
		const newChildren =
			isValidElement(children) ? renderWithClass(children, className) : children

		return cloneElement(element as ReactElement<any>, {
			className: cn(elementClassName, className),
			children: newChildren,
		})
	}
	return element
}

export const ResponsiveRenderer = ({
	breakpoint = 'md',
	below,
	above,
}: ResponsiveRendererProps) => {
	const { below: belowClass, above: aboveClass } =
		visibilityVariants[breakpoint]
	console.log('below', renderWithClass(below, aboveClass))
	console.log('abobe', renderWithClass(above, aboveClass))

	return (
		<>
			{renderWithClass(below, belowClass)}
			{renderWithClass(above, aboveClass)}
		</>
	)
}
