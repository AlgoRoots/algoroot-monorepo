import { render, screen } from '@testing-library/react'

import { ResponsiveRenderer, withBreakPoint } from './ResponsiveRenderer'

describe('withBreakPoint(): className prefix 유틸 함수', () => {
	it('이미 md:가 붙어있으면 중복되지 않게 처리한다', () => {
		const input = 'md:text-blue-500 text-base'
		const result = withBreakPoint('md', input)
		expect(result).toBe('md:text-blue-500 md:text-base')
	})

	it('기존 클래스에 md: 접두사를 잘 붙인다', () => {
		const input = 'text-red-500 font-bold'
		const result = withBreakPoint('md', input)
		expect(result).toBe('md:text-red-500 md:font-bold')
	})
})

describe('ResponsiveRenderer: 중단점 기준 렌더러', () => {
	it('기본 breakpoint(md)에서 적용한 className이 잘 적용된다', async () => {
		render(
			<ResponsiveRenderer
				below={
					<div data-testid="below" className="text-red-500">
						Below
					</div>
				}
				above={
					<div data-testid="above" className="text-blue-500">
						Above
					</div>
				}
			/>,
		)

		expect(screen.getByTestId('below')).toHaveClass('block md:hidden')
		expect(screen.getByTestId('below')).toHaveClass('text-red-500')
		expect(screen.getByTestId('above')).toHaveClass('hidden md:block')
		expect(screen.getByTestId('above')).toHaveClass('md:text-blue-500')
	})

	// https://jestjs.io/docs/api#testeachtablename-fn-timeout
	it.each(['lg', 'xl', '2xl'] as const)(
		'%s breakpoint에서도 className이 적용된다.',
		(bp) => {
			render(
				<ResponsiveRenderer
					breakpoint={bp}
					below={
						<div data-testid="below" className="text-red-500">
							Below
						</div>
					}
					above={
						<div data-testid="above" className="text-blue-500">
							Above
						</div>
					}
				/>,
			)

			const below = screen.getByTestId('below')
			const above = screen.getByTestId('above')
			expect(below).toHaveClass(`block ${bp}:hidden`)
			expect(below).toHaveClass('text-red-500')
			expect(above).toHaveClass(`hidden ${bp}:block`)
			expect(above).toHaveClass(`${bp}:text-blue-500`)
		},
	)

	it('children에도 재귀적으로 className이 적용 된다.', () => {
		render(
			<ResponsiveRenderer
				below={
					<div data-testid="below" className="p-2">
						<div data-testid="below-child-1" className="bg-red-500">
							<span data-testid="below-child-2" className="text-sm">
								Text
							</span>
						</div>
					</div>
				}
				above={
					<div data-testid="above" className="p-2">
						<span data-testid="above-child" className="text-sm">
							Text
						</span>
					</div>
				}
			/>,
		)

		expect(screen.getByTestId('below-child-1')).toHaveClass(
			'block md:hidden bg-red-500',
		)
		expect(screen.getByTestId('below-child-2')).toHaveClass(
			'block md:hidden text-sm',
		)
		expect(screen.getByTestId('above-child')).toHaveClass(
			'hidden md:block md:text-sm',
		)
	})
})
