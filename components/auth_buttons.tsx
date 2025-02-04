'use client'

import React from 'react'
import Image from 'next/image'
import googleLogo from '../public/assets/icons/google.png'
import { signIn } from 'next-auth/react'
import Button from './basic/button/Button'
import customLoader from './basic/custom_image_loader'

export function GoogleSignInButton() {
	const [loading, setLoading] = React.useState(false)

	const handleClick = React.useCallback(() => {
		setLoading(true)

		setTimeout(() => {
			setLoading(false)
		}, 5000)

		signIn('google')
	}, [])

	return (
		<Button
			isLoading={loading}
			onClick={handleClick}
			className='w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-500 hover:text-white'
		>
			<Image
				loader={customLoader}
				src={googleLogo}
				alt='Google Logo'
				width={20}
				height={20}
			/>
			<span className='ml-4 text-lg hover:text-white'>
				Continue with Google
			</span>
		</Button>
	)
}
