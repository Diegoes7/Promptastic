import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'

interface ErrorMessageProps {
	message: string | null
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		if (!message) return

		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
		}, 7000) // Fade away after 7 seconds

		return () => clearTimeout(timer) // Clear timer if the component unmounts
	}, [message])

	if (!visible) return null

	return (
		<div className='fixed top-[10%] right-[15%] bg-red-500 text-white py-2 px-4 rounded shadow-lg z-50 flex items-center'>
			<span className='flex-grow'>{message}</span>
			<button
				onClick={() => setVisible(false)}
				className='ml-4 text-white hover:text-gray-300'
				aria-label='Close'
			>
				<IoIosCloseCircleOutline className='text-xl font-bold hover:scale-110 transition-transform duration-200' />
			</button>
		</div>
	)
}

export default ErrorMessage
