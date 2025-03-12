import { cn } from '@algoroot/ui/lib/utils'
import {
	type ReactNode,
	type ReactElement,
	cloneElement,
	isValidElement,
} from 'react'
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
		below: 'flex sm:hidden',
		above: 'hidden sm:flex',
	},
	md: {
		below: 'flex md:hidden',
		above: 'hidden md:flex',
	},
	lg: {
		below: 'flex lg:hidden',
		above: 'hidden lg:flex',
	},
	xl: {
		below: 'flex xl:hidden',
		above: 'hidden xl:flex',
	},
	'2xl': {
		below: 'flex 2xl:hidden',
		above: 'hidden 2xl:flex',
	},
}

const renderWithClass = (
	element: ReactNode,
	className: ClassName,
): ReactNode => {
	if (isValidElement(element)) {
		const elementClassName =
			(element.props as { className?: string })?.className || ''
		return cloneElement(element as ReactElement<any>, {
			className: cn(elementClassName, className),
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

	return (
		<>
			{renderWithClass(below, belowClass)}
			{renderWithClass(above, aboveClass)}
		</>
	)
}
