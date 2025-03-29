import type { HtmlHTMLAttributes } from 'react'

import { Button } from '@algoroot/ui/components/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@algoroot/ui/components/sheet'
import { MessageCircleQuestion } from 'lucide-react'

import { LogoLink } from '@/components/LogoSet'

import {
	ChatQuestionListSuspense,
	ChatQuestionSheetList,
} from '../@server/ChatQuestionList'

interface ChatQuestionSheetProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export const ChatQuestionSheet = ({ ...props }: ChatQuestionSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size={'icon'} variant="default">
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
				<ChatQuestionListSuspense>
					<ChatQuestionSheetList />
				</ChatQuestionListSuspense>
				<SheetFooter>
					<LogoLink href={'/'} />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
