'use client'

import { useLoading } from '@app/utils/loading_provider'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const LoadingHandler = () => {
	const pathname = usePathname()
	const { setIsLoading } = useLoading()

	useEffect(() => {
		setIsLoading(true) // Start loading when route changes

		const timeout = setTimeout(() => {
			setIsLoading(false) // Stop loading after a short delay (simulating loading)
		}, 300)

		return () => clearTimeout(timeout) // Cleanup timeout on route change
	}, [pathname, setIsLoading])

	return null
}
