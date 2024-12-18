'use client'

import React, { FormEvent } from 'react'
import { InputField } from './basic/form_fields'
import Link from 'next/link'
import { LogInUser } from '../app/sign_up/page'
import Button from './basic/button/Button'

type LogInProps = {
	user: LogInUser
	setUser: (user: LogInUser) => void
	submitting: boolean
	handleSubmit: (e: FormEvent) => void
}

const LogInForm = ({ user, setUser, submitting, handleSubmit }: LogInProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target // Destructure name and value from the event target
		const localUser = { ...user, [name]: value }
		setUser(localUser)
	}

	return (
		<section className='w-full max-w-full flex-center flex-col p-6'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>Log in</span>
			</h1>
			<p className='desc text-left max-w-md'>Type your credentials here</p>
			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
			>
				<InputField
					inputValue={user.email}
					handleChange={handleChange}
					htmlFor='email'
					label='Email'
					subTitle='Type your email'
					name='email'
					placeholder='Type your email'
					required
				/>
				<InputField
					inputValue={user.password}
					htmlFor='password'
					handleChange={handleChange}
					label='Password'
					subTitle='Type your password'
					type='password'
					name='password'
					placeholder='Type your password'
					required
				/>
				<div className='flex-end mx-3 mb-5 gap-4'>
					<Link href='/' className='text-gray-500 text-sm'>
						<Button
							buttonStyle={{ color: 'gray', rounded: 'full', size: 'md' }}
						>
							Cancel
						</Button>
					</Link>
					<Button
						type='submit'
						isLoading={submitting}
						buttonStyle={{ color: 'teal', rounded: 'full', size: 'md' }}
					>
						Sign In
					</Button>
				</div>
			</form>
		</section>
	)
}

export default LogInForm

// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// interface CredentialsFormProps {
// 	csrfToken?: string;
// }

// export function CredentialsForm(props: CredentialsFormProps) {
// 	const router = useRouter();
// 	const [error, setError] = useState<string | null>(null);

// 	const handleSubmit = async (e: any) => {
// 		e.preventDefault();
// 		const data = new FormData(e.currentTarget);

// 		const signInResponse = await signIn('credentials', {
// 			email: data.get('email'),
// 			password: data.get('password'),
// 			redirect: false,
// 		});

// 		if (signInResponse && !signInResponse.error) {
// 			//Redirect to homepage (/timeline)
// 			router.push('/timeline');
// 		} else {
// 			console.log('Error: ', signInResponse);
// 			setError('Your Email or Password is wrong!');
// 		}
// 	};

// 	return (
// 		<form
// 			className='w-full mt-8 text-xl text-black font-semibold flex flex-col'
// 			onSubmit={handleSubmit}
// 		>
// 			{error && (
// 				<span className='p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md'>
// 					{error}
// 				</span>
// 			)}
// 			<input
// 				type='email'
// 				name='email'
// 				placeholder='Email'
// 				required
// 				className='w-full px-4 py-4 mb-4 border border-gray-300 rounded-md'
// 			/>

// 			<input
// 				type='password'
// 				name='password'
// 				placeholder='Password'
// 				required
// 				className='w-full px-4 py-4 mb-4 border border-gray-300 rounded-md'
// 			/>

// 			<button
// 				type='submit'
// 				className='w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700'
// 			>
// 				Log in
// 			</button>
// 		</form>
// 	);
// }
