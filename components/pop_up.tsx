'use client'

import React from 'react'
import Button from './basic/button/Button'

type PopUpProps = {
	isOpen: boolean
	setIsOpen: () => void
	children: React.ReactNode
}

export default function PopUp({ isOpen, setIsOpen, children }: PopUpProps) {
	// Function to close the modal when clicking outside
	const handleOutsideClick = React.useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent> | any) => {
			if (e.target === e.currentTarget) {
				setIsOpen()
			}
		},
		[setIsOpen]
	)

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'
			onClick={handleOutsideClick} // Close modal on outside click
		>
			<div className='bg-white dark:bg-slate-700 px-3 sm:px-6 py-6 rounded-lg shadow-lg relative flex flex-col justify-between responsive-container'>
				{children}
				<div className='flex justify-end mt-4'>
					<Button
						buttonStyle={{ color: 'glassBlue', rounded: 'full', size: 'md' }}
						onClick={setIsOpen}
					>
						Close Modal
					</Button>
				</div>
			</div>
		</div>
	)
}
