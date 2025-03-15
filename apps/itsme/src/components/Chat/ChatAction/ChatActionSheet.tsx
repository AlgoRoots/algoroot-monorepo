import React, { type ComponentProps } from 'react'

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
import { MessageCircleQuestion } from 'lucide-react'

import { LogoLink } from '@/components/LogoLink'

import { useChatActionContext } from './context/useChatAction'

interface ChatActionSheetProps extends ComponentProps<'div'> {}

export const ChatActionSheet = ({
	children,
	...props
}: ChatActionSheetProps) => {
	const action = useChatActionContext()
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button disabled={action.isLoading} size={'icon'} variant="default">
					<MessageCircleQuestion className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side={'bottom'} className="items-center" {...props}>
				<SheetHeader className="text-center">
					<SheetTitle className="bg-none text-lg font-semibold md:text-xl">
						또는, 편하게 질문하기!
					</SheetTitle>
					<SheetDescription className="text-muted-foreground text-sm">
						선택하면 채팅이 시작돼요.
					</SheetDescription>
				</SheetHeader>
				<SheetClose asChild>{children}</SheetClose>
				<SheetFooter>
					<LogoLink href={'/'} />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
