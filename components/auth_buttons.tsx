'use client'

import React from 'react'
import Image from 'next/image'
import googleLogo from '../public/assets/icons/google.png'
import { signIn } from 'next-auth/react'
import useNavigationWithLoading from '@app/utils/useNavigationWithLoading'
import Button from './basic/button/Button'

export function GoogleSignInButton() {
	const { loading, disabled, handleNavigation } =
		useNavigationWithLoading('/providers/google')
	const handleClick = () => {
		signIn('google')
	}

	return (
		<Button
		isLoading={loading}
		disabled={disabled}
			onClick={handleClick}
			className='w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200'
		>
			<Image src={googleLogo} alt='Google Logo' width={20} height={20} />
			<span className='ml-4'>Continue with Google</span>
		</Button>
	)
}
