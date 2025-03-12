import { cn } from '@algoroot/ui/lib/utils'

const BasisLayout = ({
	className,
	children,
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn(
				'grid-container',
				'h-screen',
				'bg-background-basic-1',
				className,
			)}
		>
			{children}
		</div>
	)
}

const BasisHeader = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<header
			className={cn(
				'area-header stack-h bg-background sticky top-0 z-50',
				'px-4 md:px-4 lg:px-10',
				'border-b-1 border-gray-200 shadow-sm',
				className,
			)}
			{...props}
		>
			{children}
		</header>
	)
}

const BasisMain = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<main className={cn('area-main', className)} {...props}>
			{children}
		</main>
	)
}

const BasisFooter = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<footer className={cn('area-footer', className)} {...props}>
			{children}
		</footer>
	)
}

export { BasisLayout, BasisHeader, BasisMain, BasisFooter }
