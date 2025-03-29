import type { ComponentProps } from 'react'

import { Show } from '@algoroot/shared/components'

import { ChatActionProvider } from '../../contexts/ChatActionContext'
import { ChatDisclaimer } from './@parts'
import { ChatActionButton, ChatActionForm, ChatActionInput } from './ChatAction'

interface ChatActionBarProps extends Omit<ComponentProps<'div'>, 'onSubmit'> {
	onSubmit: (val: string) => Promise<void>
	isDisable?: boolean
}

const ChatActionBar = ({
	onSubmit,
	isDisable,
	children,
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
					{children && children}
					<ChatActionButton />
				</div>
				<ChatDisclaimer />
			</ChatActionForm>
		</ChatActionProvider>
	)
}

export default ChatActionBar
