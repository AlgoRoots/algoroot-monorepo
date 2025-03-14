import { cn } from '@algoroot/ui/lib/utils'

const BasisLayout = ({
	className,
	children,
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn('grid-container relative', 'h-screen', className)}>
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
				'area-header bg-background sticky top-0 z-50 flex items-center justify-between',
				'px-4 md:px-4 lg:px-10',
				'border-b-1 border-muted dark:shadow-sm',
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
