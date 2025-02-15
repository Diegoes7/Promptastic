'use client'

import React from 'react'
import Button from './basic/button/Button'

type PopUpProps = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export default function PopUp({ isOpen, onClose, children }: PopUpProps) {
	// Function to close the modal when clicking outside
	const handleOutsideClick = React.useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (e.target === e.currentTarget) {
				onClose() //* Call the `onClose` function
			}
		},
		[onClose]
	)

	//! Handle Escape key press to close the modal
	React.useEffect(() => {
		// Function to handle keydown events
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		//* Add event listener for keydown event when modal is open
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		}

		//$ Clean up the event listener when the modal is closed or unmounted
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, onClose]) //* Only trigger when `isOpen` or `onClose` changes

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'
			onClick={handleOutsideClick}
		>
			<div className='bg-white dark:bg-slate-700 px-3 sm:px-6 py-6 rounded-lg shadow-lg relative flex flex-col justify-between responsive-container'>
				{children}
				<div className='flex justify-end mt-4'>
					<Button
						buttonStyle={{ color: 'glassBlue', rounded: 'full', size: 'md' }}
						onClick={onClose}
					>
						Close Modal
					</Button>
				</div>
			</div>
		</div>
	)
}
