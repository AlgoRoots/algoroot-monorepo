'use client'

import { Button } from '@algoroot/ui/components/button'
import { useTheme } from 'next-themes'
import type { HTMLAttributes, ReactNode } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'

const ThemeSwitcher = ({ ...props }: HTMLAttributes<HTMLButtonElement>) => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () =>
		theme === 'dark' ? setTheme('light') : setTheme('dark')

	return (
		<Button
			variant={'secondary'}
			size={'icon'}
			onClick={toggleTheme}
			className="cursor-pointer bg-red-400"
			{...props}
		>
			<ThemeRenderer onLight={<SunIcon />} onDark={<MoonIcon />} />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}

type ThemeRendererProps = {
	onLight: ReactNode
	onDark: ReactNode
}

const ThemeRenderer = ({ onLight, onDark }: ThemeRendererProps) => {
	return (
		<>
			<div data-hide-on-theme="dark">{onDark}</div>
			<div data-hide-on-theme="light">{onLight}</div>
		</>
	)
}

export { ThemeSwitcher, ThemeRenderer }
