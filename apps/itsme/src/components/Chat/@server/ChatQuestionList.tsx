'use client'

import { type ComponentProps, Fragment, type ReactNode } from 'react'

import Link from 'next/link'

import {
	AsyncButton,
	ListRenderer,
	LoadingView,
	SkeletonList,
} from '@algoroot/shared/components'
import { SheetClose } from '@algoroot/ui/components/sheet'
import { cn } from '@algoroot/ui/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'

import { useTRPC } from '@/modules/api/trpc/client'
import type { appRouter } from '@/modules/api/trpc/router'
import type { ApiResponseType, ItemType } from '@/modules/api/trpc/type'

import { useChatContext } from '@/contexts/ChatContext'

// ─── Types ───────────────────────────────────────────────

type Question = ItemType<
	ApiResponseType<typeof appRouter, 'getSuggestQuestions'>
>

interface ChatQuestionListProps extends Omit<ComponentProps<'ul'>, 'children'> {
	visibleHeader?: boolean
	children?: (props: {
		item: Question
		index: number
		onSubmit: (item: Question) => Promise<void>
		isDisable: boolean
	}) => ReactNode
}

// ─── Styles ──────────────────────────────────────────────

const chatQuestionListStyles = cn(
	'max-h-[300px] w-full max-w-4xl space-y-4 overflow-y-auto border-t pt-4 md:pt-8',
	'md:columns-2',
)

const chatQuestionListButtonStyles = cn(
	'bg-card text-card-foreground h-fit w-full whitespace-normal break-words text-left disabled:cursor-not-allowed',
)

// ───  Base Component ─────────────────────────────────

export const ChatQuestionListBase = ({
	className,
	children,
	...props
}: ChatQuestionListProps) => {
	const trpc = useTRPC()
	const { data } = useSuspenseQuery(trpc.getSuggestQuestions.queryOptions())
	const chat = useChatContext()

	if (!children)
		throw new Error('ChatQuestionListBase: children renderer가 필요합니다.')

	const handleSubmit = (item: Question) => chat.handler.submit(item.content)

	return (
		<Fragment>
			<ListRenderer
				className={cn(chatQuestionListStyles, className)}
				data={data}
				render={(item, index) =>
					children({
						item,
						index,
						onSubmit: handleSubmit,
						isDisable: chat.state.isPending,
					})
				}
				{...props}
			/>
			{chat.state.isPending && (
				<p className="mt-4 text-sm">
					답변이 모두 완료된 후 선택할 수 있습니다.
				</p>
			)}
		</Fragment>
	)
}

// ─── Variants ────────────────────────────────────────────

export const ChatQuestionList = () => (
	<ChatQuestionListBase>
		{({ item, onSubmit, isDisable }) =>
			isDisable ?
				<AsyncButton
					onClick={async (e) => e.preventDefault()}
					disabled
					className={chatQuestionListButtonStyles}
				>
					{item.content}
				</AsyncButton>
			:	<Link href="/chat" className="h-fit w-fit">
					<AsyncButton
						onClick={() => onSubmit(item)}
						className={chatQuestionListButtonStyles}
					>
						{item.content}
					</AsyncButton>
				</Link>
		}
	</ChatQuestionListBase>
)

export const ChatQuestionSheetList = () => (
	<ChatQuestionListBase>
		{({ item, onSubmit, isDisable }) => (
			<SheetClose asChild>
				<AsyncButton
					disabled={isDisable}
					onClick={() => onSubmit(item)}
					className={chatQuestionListButtonStyles}
				>
					{item.content}
				</AsyncButton>
			</SheetClose>
		)}
	</ChatQuestionListBase>
)

// ─── Suspense ────────────────────────────────────

export const ChatQuestionListSuspense = ({
	children,
}: {
	children: ReactNode
}) => (
	<LoadingView
		fallback={
			<SkeletonList
				count={6}
				containerClass={chatQuestionListStyles}
				className="h-[36px]"
			/>
		}
	>
		{children}
	</LoadingView>
)
