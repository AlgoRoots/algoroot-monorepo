import Link from 'next/link'

import { AsyncButton, type AsyncButtonProps } from '@algoroot/shared/components'

interface ChatQuestionItemProps extends AsyncButtonProps {
	content: string
}

export const ChatQuestionLink = ({
	content,
	...props
}: ChatQuestionItemProps) => {
	return (
		<AsyncButton asChild {...props}>
			<Link href={'/chat'}>{content}</Link>
		</AsyncButton>
	)
}
