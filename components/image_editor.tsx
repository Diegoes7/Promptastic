import React, { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import {
	UploadPictureDocument,
	useUploadPictureMutation,
} from 'generated/graphql'
import customLoader from './basic/custom_image_loader'

export const defaultAvatar =
	'/assets/images/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'

const AvatarUploader = () => {
	const [upload] = useUploadPictureMutation({
		refetchQueries: [UploadPictureDocument],
	})
	const [imageSrc, setImageSrc] = useState('')
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
	}

	// Convert image URL to a File object
	const urlToFile = async (url: string): Promise<File | null> => {
		try {
			const response = await fetch(url)
			if (
				!response.ok ||
				!response.headers.get('content-type')?.startsWith('image/')
			) {
				throw new Error('Invalid image URL')
			}

			const blob = await response.blob()
			const fileName = url.split('/').pop() || 'image.png'
			return new File([blob], fileName, { type: blob.type })
		} catch (error) {
			console.error('Error converting URL to file:', error)
			setError('Invalid image URL. Please try again.')
			return null
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

		let uploadFile = file

		// If no file is selected but an image URL is provided, convert the URL to a file
		if (!uploadFile && imageSrc) {
			uploadFile = await urlToFile(imageSrc)
			if (!uploadFile) {
				setError('Failed to process image URL. Please try again.')
				return
			}
		}

		// If no file or URL is provided, show an error
		if (!uploadFile) {
			setError('Please select a file or provide an image URL before uploading.')
			return
		}

		try {
			await upload({
				variables: {
					file: uploadFile,
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
					loader={customLoader}
					alt='user picture'
					src={imageSrc || defaultAvatar}
					width={100} // Fallback width
					height={100} // Fallback height
					className='rounded-full w-24 h-24 object-cover'
				/>
			</div>
			{error && <p className='text-red-500'>{error}</p>}
			<div className='space-y-4 mt-4 w-full max-w-sm dark:text-white'>
				<form onSubmit={handlePictureSubmit} encType='multipart/form-data'>
					<label className='text-center text-gray-700'>
						Upload an image from your computer:
						<input
							className='block my-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm'
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							name='picture'
						/>
					</label>
					<label>
						Enter an image URL:
						<input
							className='block my-2 w-full p-4 py-2 border border-gray-300 rounded-md text-sm'
							placeholder='Enter image URL'
							value={imageSrc}
							onChange={handleUrlChange}
							name='picture'
						/>
					</label>
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
