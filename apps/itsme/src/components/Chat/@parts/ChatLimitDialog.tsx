'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@algoroot/ui/components/alert-dialog'

interface ChatLimitDialogProps {
	isOpen: boolean
	onOpenChange?: (open: boolean) => void
}

export const ChatLimitDialog = ({
	isOpen,
	onOpenChange,
}: ChatLimitDialogProps) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>이용 제한 안내</AlertDialogTitle>
					<AlertDialogDescription>
						같은 IP에서는 하루에 최대 50개의 질문만 가능합니다.
						<br />
						내일 다시 이용해 주세요 🙏
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction>확인</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
