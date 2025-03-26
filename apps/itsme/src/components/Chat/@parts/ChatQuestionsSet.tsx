import { type ComponentProps, type HtmlHTMLAttributes } from 'react'

import { AsyncButton, ListRenderer } from '@algoroot/shared/components'
import { Button } from '@algoroot/ui/components/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@algoroot/ui/components/sheet'
import { cn } from '@algoroot/ui/lib/utils'
import { MessageCircleQuestion } from 'lucide-react'

import { LogoLink } from '../../LogoSet'

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

interface ChatQuestionListProps extends ComponentProps<'ul'> {
	onClickItem: (val: string) => Promise<void>
	visibleHeader?: boolean
}

const ChatQuestionList = ({
	className,
	onClickItem,
	...props
}: ChatQuestionListProps) => {
	return (
		<ListRenderer
			className={cn(
				'max-h-[300px] w-full max-w-4xl space-y-4 overflow-y-auto border-t pt-4 md:pt-8',
				'md:columns-2',
				className,
			)}
			data={[
				`It's me 서비스는 어떤건지 설명해줘.`,
				'피그마 플러그인 개발한 서비스가 어떤거야?',
				'너가 개발로 겪었던 이슈나 해결과정에 대해 알려줘.',
				'프로젝트를 진행하며 사용성이나 성능을 개선했던 일이 있어?',
				'너는 왜 개발자가 됐어?',
				`It's me 서비스에서 포트폴리오를 어떻게 읽은거야?`,
				'너가 보일러 플레이트 관련해서 한 일을 알려줘.',
				'성능이나 기능 개선했던 경험을 말해줘',
				'너 취미가 뭐야?',
			]}
			render={(content) => (
				<AsyncButton
					onClick={() => onClickItem(content)}
					className="bg-card text-card-foreground h-fit w-full whitespace-normal break-words text-left"
				>
					{content}
				</AsyncButton>
			)}
			{...props}
		/>
	)
}

interface ChatQuestionSheetProps extends HtmlHTMLAttributes<HTMLDivElement> {
	isDisableTrigger?: boolean
	onClickItem: (val: string) => Promise<void>
}

const ChatQuestionSheet = ({
	isDisableTrigger,
	onClickItem,
	...props
}: ChatQuestionSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button disabled={isDisableTrigger} size={'icon'} variant="default">
					<MessageCircleQuestion className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side={'bottom'} className="items-center px-4" {...props}>
				<SheetHeader className="text-center">
					<SheetTitle className="bg-none text-lg font-semibold md:text-xl">
						편하게 질문하기!
					</SheetTitle>
					<SheetDescription className="text-muted-foreground text-sm">
						선택하면 채팅이 시작돼요.
					</SheetDescription>
				</SheetHeader>
				<SheetClose asChild>
					<ChatQuestionList onClickItem={onClickItem} />
				</SheetClose>
				<SheetFooter>
					<LogoLink href={'/'} />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export { ChatQuestionHeader, ChatQuestionList, ChatQuestionSheet }
