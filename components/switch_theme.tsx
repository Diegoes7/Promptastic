// app/components/ThemeSwitch.tsx
'use client'

import { FiSun, FiMoon } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { CgDarkMode } from "react-icons/cg";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false)
	const { setTheme, resolvedTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	if (!mounted)
		return (
			<CgDarkMode className='text-xl' />
		)

	if (resolvedTheme === 'dark') {
		return <FiSun className='ml-2' onClick={() => setTheme('light')} />
	}

	if (resolvedTheme === 'light') {
		return <FiMoon className='ml-2' onClick={() => setTheme('dark')} />
	}
}
