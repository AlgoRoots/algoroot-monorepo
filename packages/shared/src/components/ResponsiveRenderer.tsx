import {
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from 'react'

import { cn } from '@algoroot/ui/lib/utils'
import type { ClassName } from '@algoroot/ui/types/'

// type BreakPointKeys = keyof typeof config.theme.screens;
// sm은 default이기 때문에 제외
type BreakPointKeys = 'md' | 'lg' | 'xl' | '2xl'
interface ResponsiveRendererProps {
	breakpoint?: BreakPointKeys
	below: ReactElement<Record<string, any>>
	above: ReactElement<Record<string, any>>
}

const visibilityVariants: Record<
	BreakPointKeys,
	{ below: ClassName; above: ClassName }
> = {
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

const withBreakPoint = (bp: BreakPointKeys, className?: string) => {
	if (!className) return ''
	return className
		.split(' ')
		.map((c) => `${bp}:${c}`)
		.join(' ')
		.replace(/\b(md:)+/g, 'md:')
}

type RenderWithClassProps = {
	type: 'above' | 'below'
	element: ReactElement<Record<string, any>>
	className: ClassName
	bp: BreakPointKeys
}
const renderWithClass = ({
	element,
	...props
}: RenderWithClassProps): ReactNode => {
	if (!isValidElement(element)) return element

	const elClassName =
		props.type === 'below' ?
			element.props.className
		:	withBreakPoint(props.bp, element.props.className)

	const newChildren =
		isValidElement(element.props.children) ?
			renderWithClass({
				element: element.props.children as ReactElement<Record<string, any>>,
				...props,
			})
		:	element.props.children

	return cloneElement(element, {
		className: cn(props.className, elClassName),
		children: newChildren,
	})
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
			{renderWithClass({
				type: 'below',
				bp: breakpoint,
				element: below,
				className: belowClass,
			})}
			{renderWithClass({
				type: 'above',
				bp: breakpoint,
				element: above,
				className: aboveClass,
			})}
		</>
	)
}
