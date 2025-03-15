'use client'

import type { HTMLAttributes, ReactNode } from 'react'

import { useTheme } from 'next-themes'

import { Button } from '@algoroot/ui/components/button'
import { MoonIcon, SunIcon } from 'lucide-react'

import { Icons } from './Icons'

const ThemeSwitcher = ({ ...props }: HTMLAttributes<HTMLButtonElement>) => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () =>
		theme === 'dark' ? setTheme('light') : setTheme('dark')

	return (
		<Button
			variant="outline"
			size={'icon'}
			onClick={toggleTheme}
			// className="hover:*:text-white"
			{...props}
		>
			<ThemeRenderer
				onLight={<SunIcon className="size-5" />}
				onDark={<MoonIcon className="size-5" />}
			/>
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
