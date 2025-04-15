import type { ReactNode } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AsyncButton } from './AsyncButton'

function setup(jsx: ReactNode) {
	return {
		user: userEvent.setup(),
		...render(jsx),
	}
}

describe('AsyncButton: 비동기 중복 클릭 방지 버튼', () => {
	it('한 번 클릭 시 onClick이 호출된다', async () => {
		const handleClick = jest.fn()

		const { user } = setup(
			<AsyncButton onClick={handleClick}>Click Me!</AsyncButton>,
		)

		const button = screen.getByRole('button', { name: /click me!/i })
		await user.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('onClick 실행 중엔 중복 클릭이 무시된다', async () => {
		const handleClick = jest.fn(() => {
			return new Promise<void>((resolve) => {
				setTimeout(resolve, 300)
			})
		})

		const { user } = setup(
			<AsyncButton onClick={handleClick}>Click Me!</AsyncButton>,
		)

		const button = screen.getByRole('button', { name: /click me!/i })

		await Promise.all([user.click(button), user.click(button)])

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('disabled 상태에서는 클릭해도 onClick이 호출되지 않는다', async () => {
		const handleClick = jest.fn()

		const { user } = setup(
			<AsyncButton disabled onClick={handleClick}>
				Disabled
			</AsyncButton>,
		)

		const button = screen.getByRole('button', { name: /disabled/i })
		expect(button).toBeDisabled()

		await user.click(button)
		expect(handleClick).not.toHaveBeenCalled()
	})
})
