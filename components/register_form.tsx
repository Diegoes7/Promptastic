'use client'

import React, { FormEvent } from 'react'
import { InputField } from './basic/form_fields'
import Link from 'next/link'
import Button from './basic/button/Button'
import useNavigationWithLoading from '@app/utils/useNavigationWithLoading'
import {
	MdOutlineAssignmentInd,
	MdOutlineCancelScheduleSend,
} from 'react-icons/md'

export type User = {
	username: string
	email: string
	password: string
	picture: string
}

type UseFormProps = {
	user: User
	setUser: (user: User) => void
	submitting: boolean
	handleSubmit: (e: FormEvent) => void
}

const RegisterForm = ({ user, setUser, handleSubmit }: UseFormProps) => {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		// Handle the case where an event is passed
		const { name, value } = e.target // Destructure name and value from the event target
		const localUser = { ...user, [name]: value }
		setUser(localUser)
	}
	const { loading, disabled, handleNavigation } =
		useNavigationWithLoading('/create_prompt')

	return (
		<section className='w-full max-w-full flex-center flex-col p-6'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>Register</span>
			</h1>
			<p className='desc text-left max-w-md'>
				and share amazing prompts with the world, and let your imagination run
				wild with any AI-powered platform
			</p>
			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
			>
				<InputField
					htmlFor='username'
					inputValue={user.username}
					handleChange={handleChange}
					label='Username'
					subTitle='(Type your nickname)'
					name='username'
					placeholder='Type your name'
					required
				/>
				<InputField
					inputValue={user.email}
					handleChange={handleChange}
					htmlFor='email'
					label='Email'
					subTitle='(Type your email)'
					name='email'
					placeholder='Type your email'
					required
				/>
				<InputField
					inputValue={user.password}
					htmlFor='password'
					handleChange={handleChange}
					label='Password'
					subTitle='(Type your password)'
					type='password'
					name='password'
					placeholder='Type your password'
					required
				/>
				<div className='flex-end mx-3 mb-5 gap-4'>
					<Link href='/' className='text-gray-500 text-sm'>
						<Button
							buttonStyle={{ color: 'gray', rounded: 'full', size: 'md' }}
							rightIcon={<MdOutlineCancelScheduleSend />}
						>
							Cancel
						</Button>
					</Link>
					<Button
						onClick={disabled ? undefined : handleNavigation}
						buttonStyle={{ color: 'teal', rounded: 'full', size: 'md' }}
						rightIcon={<MdOutlineAssignmentInd />}
					>
						Register
					</Button>
				</div>
			</form>
		</section>
	)
}

export default RegisterForm
