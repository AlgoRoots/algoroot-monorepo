import { Button } from '@algoroot/ui/components/button'
import { Input } from '@algoroot/ui/components/input'
import {
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetClose,
	Sheet,
} from '@algoroot/ui/components/sheet'
import type { HtmlHTMLAttributes } from 'react'
import { LogoLink } from '../LogoLink'
import { MessageCircleQuestion } from 'lucide-react'

interface ChatQuestionSheetProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export const ChatQuestionSheet = ({
	children,
	...props
}: ChatQuestionSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger
				asChild //
				// className="absolute -top-12 left-2 z-40"
			>
				<Button size={'icon'} variant="default">
					<MessageCircleQuestion className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side={'bottom'} {...props}>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
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
