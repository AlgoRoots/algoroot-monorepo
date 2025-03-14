import { ListRenderer } from '@algoroot/share/components'
import { Button } from '@algoroot/ui/components/button'
import { cn } from '@algoroot/ui/lib/utils'
import React, { type HtmlHTMLAttributes } from 'react'

interface ChatQuestionListProps extends HtmlHTMLAttributes<HTMLDivElement> {
	onClickItem: (val: string) => Promise<void>
}

export const ChatQuestionList = ({
	className,
	onClickItem,
	...props
}: ChatQuestionListProps) => {
	return (
		<section
			className={cn('w-full space-y-4 border-t pt-4 md:pt-8', className)}
			{...props}
		>
			<header className="w-full space-y-1 text-center">
				<h2 className="text-lg font-semibold md:text-xl">
					또는, 편하게 질문하기!
				</h2>
				<p className="text-muted-foreground text-sm">
					선택하면 채팅이 시작 돼요.
				</p>
			</header>
			<ListRenderer
				className="w-full space-y-4 md:columns-2"
				data={[
					`It's me 서비스는 어떤건지 설명해줘.`,
					'너가 보일러 플레이트 관련해서 한 일을 알려줘.',
					'너가 개발로 겪었던 이슈나 해결과정에 대해 알려줘.',
					'너 취미가 뭐야?',
				]}
				render={(content) => {
					return (
						<Button
							className="bg-card text-card-foreground h-fit w-full whitespace-normal break-words text-left"
							onClick={() => onClickItem(content)}
						>
							{content}
						</Button>
					)
				}}
			/>
		</section>
	)
}
