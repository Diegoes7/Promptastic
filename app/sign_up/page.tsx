'use client'

import useNavigationWithLoading from '@app/utils/useNavigationWithLoading'
import { GoogleSignInButton } from '../../components/auth_buttons'
import Button from '../../components/basic/button/Button'
import LogInForm from '../../components/login_form'
import { useLoginMutation } from '../../generated/graphql'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { MdOutlineAssignmentInd } from 'react-icons/md'

export type LogInUser = {
	email: string
	password: string
}

const SignIn = () => {
	const { data: session } = useSession()
	const {
		loading: registerLoading,
		disabled,
		handleNavigation,
	} = useNavigationWithLoading('/register')
	const router = useRouter()
	const [login, { loading }] = useLoginMutation()
	const [user, setUser] = useState<LogInUser>({
		email: '',
		password: '',
	})

	React.useEffect(() => {
		if (session?.user) {
			router.push('/')
		}
	}, [session?.user])

	const loginUser = React.useCallback(
		async (e: FormEvent) => {
			e.preventDefault()

			try {
				const response = await login({
					variables: {
						email: user.email,
						password: user.password,
					},
				})

				// Automatically sign in the user after registration
				await signIn('credentials', {
					email: user.email,
					password: user.password,
					callbackUrl: `${window.location.origin}/`,
				})
				console.log(response)
				router.push('/')
			} catch (error) {
				console.log(error)
			}
		},
		[user]
	)

	return (
		<div className='flex flex-col gap-4 items-center justify-center sm:flex-row'>
			<section>
				<LogInForm
					user={user}
					setUser={setUser}
					submitting={loading}
					handleSubmit={loginUser}
				/>
			</section>
			<section className='flex flex-col border-2 border-white h-[270px] px-4 rounded-lg mt-[5%]  justify-around items-center sm:mt-[25%]'>
				<GoogleSignInButton />
				<div>
					<h1 className='mb-4'>If you do NOT have account, register.</h1>
					<Link href='/register'>
						<Button
							isLoading={registerLoading}
							onClick={disabled ? undefined : handleNavigation}
							className='px-[70px] text-lg'
							buttonStyle={{
								color: 'green',
								rounded: 'lg',
								size: 'md',
								align: 'center',
							}}
							rightIcon={<MdOutlineAssignmentInd />}
						>
							Go To Register
						</Button>
					</Link>
				</div>
			</section>
			{/* <section>
				<Register />
			</section> */}
		</div>
	)
}

export default SignIn
