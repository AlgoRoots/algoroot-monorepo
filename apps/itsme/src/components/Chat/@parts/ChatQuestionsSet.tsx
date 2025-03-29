import { type ComponentProps } from 'react'

import { cn } from '@algoroot/ui/lib/utils'

const ChatQuestionHeader = ({ className, ...props }: ComponentProps<'div'>) => {
	return (
		<div
			className={cn('mb-4 w-full space-y-1 text-center', className)}
			{...props}
		>
			<h2 className="text-lg font-semibold md:text-xl">
				또는, 편하게 질문하기!
			</h2>
			<p className="text-muted-foreground text-sm">
				선택하면 채팅이 시작 돼요.
			</p>
		</div>
	)
}

export { ChatQuestionHeader }
