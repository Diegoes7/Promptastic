import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import { useUploadPictureMutation } from 'generated/graphql'

export const defaultAvatar =
	'/assets/images/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'

const AvatarUploader = () => {
	const [upload] = useUploadPictureMutation()
	const [imageSrc, setImageSrc] = useState(defaultAvatar)
	const [file, setFile] = useState<File | null>(null) // State to hold the selected file
	const [error, setError] = useState<string | null>(null) // State for error messages

	// Handle file change and set the file state
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile) {
			const imageUrl = URL.createObjectURL(selectedFile)
			setImageSrc(imageUrl)
			setFile(selectedFile)
			setError(null) // Reset error state
		}
	}

	// Handle URL change (URL input field)
	const handleUrlChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const imageUrl = event.target.value
		setImageSrc(imageUrl)
		setFile(null) // Clear file state
		setError(null) // Reset error state

		// Validate URL
		try {
			const response = await fetch(imageUrl)
			if (
				!response.ok ||
				!response.headers.get('content-type')?.startsWith('image/')
			) {
				throw new Error('Invalid image URL')
			}
		} catch (error) {
			console.error('Image URL validation error:', error)
			setError('Invalid image URL. Please try again.')
		}
	}

	// Handle clearing the image
	const handleClear = () => {
		setImageSrc(defaultAvatar)
		setFile(null)
		setError(null)
	}

	// Handle picture submission
	const handlePictureSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (!file) {
			setError('Please select a file before uploading.')
			return
		}

		try {
			await upload({
				variables: {
					file: file,
				},
			})
			alert('Upload successful!')
		} catch (error) {
			console.error('Error uploading file:', error)
			setError('Failed to upload image. Please try again.')
		}
	}

	return (
		<div className='flex flex-col items-center mt-4'>
			<div className='mt-4'>
				<Image
					alt='user picture'
					src={imageSrc || defaultAvatar}
					width={77}
					height={97}
					className='rounded-full'
				/>
			</div>
			{error && <p className='text-red-500'>{error}</p>}
			<div className='space-y-4 mt-4 w-full max-w-sm'>
				<form onSubmit={handlePictureSubmit} encType="multipart/form-data">
					<p className='text-center text-gray-700'>
						Upload an image from your computer or enter an image URL:
					</p>
					<input
						className='block w-full px-4 py-2 border border-gray-300 rounded-md text-sm'
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						name='picture'
					/>
					<input
						className='block w-full px-4 py-2 border border-gray-300 rounded-md text-sm'
						placeholder='Enter image URL'
						value={imageSrc}
						onChange={handleUrlChange}
						name='picture'
					/>
					<button
						className='block w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm'
						onClick={handleClear}
						type='button'
					>
						Clear
					</button>
					<button
						className='block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm mt-2'
						type='submit'
					>
						Upload
					</button>
				</form>
			</div>
		</div>
	)
}

export default AvatarUploader
