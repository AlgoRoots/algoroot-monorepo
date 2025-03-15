import type { ComponentProps } from 'react'

import { Show } from '@algoroot/shared/components'

import { ChatDisclaimer, ChatQuestionSheet } from './@parts'
import { ChatActionButton, ChatActionForm, ChatActionInput } from './ChatAction'
import { ChatActionProvider } from './ChatAction/context/useChatAction'

interface ChatActionBarProps extends Omit<ComponentProps<'div'>, 'onSubmit'> {
	onSubmit: (val: string) => Promise<void>
	isDisable?: boolean
	isVisibleSubAction?: boolean
}

const ChatActionBar = ({
	onSubmit,
	isDisable,
	isVisibleSubAction = false,
}: ChatActionBarProps) => {
	return (
		<ChatActionProvider
			params={{
				onSubmit: onSubmit,
				isDisable: isDisable || false,
			}}
		>
			<ChatActionForm>
				<ChatActionInput />
				<div className="flex items-center justify-between gap-2 p-3">
					<Show when={isVisibleSubAction}>
						<ChatQuestionSheet
							onClickItem={onSubmit}
							isDisableTrigger={isDisable}
						/>
					</Show>
					<ChatActionButton />
				</div>
				<ChatDisclaimer />
			</ChatActionForm>
		</ChatActionProvider>
	)
}

export default ChatActionBar
