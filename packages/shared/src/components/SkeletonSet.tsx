import { Skeleton } from '@algoroot/ui/components/skeleton'
import { cn } from '@algoroot/ui/lib/utils'
import type { ClassName } from '@algoroot/ui/types/'
import { Fragment } from 'react/jsx-runtime'

export const SkeletonList = ({
	count,
	containerClass,
	className,
}: React.HTMLAttributes<HTMLDivElement> & {
	containerClass?: ClassName
	count: number
}) => {
	return (
		<div className={cn('w-full', containerClass)}>
			{Array.from({ length: count }).map((_, index) => {
				return (
					<Fragment key={index}>
						{index === 0 && <p className="sr-only">loading..</p>}
						<Skeleton className={cn('h-[200px] w-full', className)} />
					</Fragment>
				)
			})}
		</div>
	)
}
