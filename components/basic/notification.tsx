import React from 'react'

interface NotificationProps {
	message: string
	onConfirm: () => void
	onCancel: () => void
}

const Notification = ({ message, onConfirm, onCancel }: NotificationProps) => {
	return (
		// <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded border w-96 z-50">
		<div className='absolute w-[300px] top-[10%] left-[3%] bg-white dark:bg-slate-700 text-inherit shadow-lg p-4 rounded border w-96 z-[999999]'>
			<p className='text-inherit pb-4'>{message}</p>
			<div className='mt-4 flex justify-end space-x-2'>
				<button
					onClick={onCancel}
					className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
				>
					Cancel
				</button>
				<button
					onClick={onConfirm}
					className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
				>
					Confirm
				</button>
			</div>
		</div>
	)
}

export default Notification
