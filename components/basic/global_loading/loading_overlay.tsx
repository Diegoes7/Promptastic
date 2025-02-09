// components/LoadingOverlay.tsx
'use client'

import { useLoading } from '@app/utils/loading_provider'
import { ImSpinner2 } from 'react-icons/im'

export const LoadingOverlay = () => {
	const { isLoading } = useLoading()

	if (!isLoading) return null

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50'>
			<ImSpinner2
				className='animate-spin'
				color='rgba(226, 75, 10, 0.85)'
				size={60}
			/>
		</div>
	)
}
