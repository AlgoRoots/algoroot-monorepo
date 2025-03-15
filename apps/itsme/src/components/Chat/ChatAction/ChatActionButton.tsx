import React from 'react'

import { Button } from '@algoroot/ui/components/button'

import { useChatActionContext } from './context/useChatAction'

export const ChatActionButton = () => {
	const action = useChatActionContext()
	return (
		<Button
			type="submit"
			isLoading={action.isDisable}
			disabled={action.isDisable || !action.value}
			className="ml-auto"
		>
			보내기
		</Button>
	)
}
