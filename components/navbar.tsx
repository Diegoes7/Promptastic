'use client'

import React, { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import Button from './basic/button/Button'
import AvatarMenu from './avatar_menu'
import Popup from './pop_up'
import MainLists from './main_lsits'
import Avatar from './basic/avatar'
import { MyOwnSession } from '@app/api/auth/authOptions'
import { useWindowWidth } from '@app/utils/window_width'
import ThemeSwitch from './switch_theme'

import { FaSignInAlt } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { FaMedal } from 'react-icons/fa'
import { FaPowerOff } from 'react-icons/fa6'
import { MdOutlineNoteAdd } from 'react-icons/md'

import useNavigationWithLoading from '../app/utils/useNavigationWithLoading'

const Navbar = () => {
	const width = useWindowWidth()
	const { data: session } = useSession()
	const [isOpen, setIsOpen] = React.useState(false)
	const [isClient, setIsClient] = React.useState(false)
	const userID = session?.user && parseInt((session as MyOwnSession).userID!)
	const name = session?.user?.name || ''
	const buttonSize = width > 600 ? 'md' : 'xs'
	// const { loading, disabled, handleNavigation } =
	// 	useNavigationWithLoading('/create_prompt')
	// const {
	// 	loading: signOutLoading,
	// 	disabled: signOutDisabled,
	// 	handleNavigation: handleNavigationSignOut,
	// } = useNavigationWithLoading('/')

	const handlePopUp = useCallback(() => {
		setIsOpen(!isOpen)
	}, [isOpen])

	React.useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<nav className='flex-between gap-1 items-center w-full mb-6 pt-6 customSticky shadow-lg text-base sm:text-sm'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					alt='Promptastic logo'
					width={37}
					height={37}
					className='object-contain'
				/>
				{
					<span className='logo-text'>
						{isClient && width > 500 ? 'Promptastic' : ''}
					</span>
				}
			</Link>
			<Button
				onClick={handlePopUp}
				buttonStyle={{ color: 'glassBlue', rounded: 'full', size: buttonSize }}
				rightIcon={<FaMedal />}
			>
				Trendy
			</Button>
			<ChatgtpButton buttonSize={buttonSize} />

			<Popup setIsOPen={handlePopUp} isOpen={isOpen}>
				<MainLists />
			</Popup>

			<div className='md:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5 items-center'>
						<CreatePromptButton buttonSize={buttonSize} />
						<div>
							<SignOutButton buttonSize={buttonSize} />
						</div>
						<Link href='/profile' className='dropdown_link'>
							{session && (
								<Avatar
									width={37}
									height={37}
									userId={userID!}
									name={name}
									alt='user picture'
								/>
							)}
						</Link>
					</div>
				) : (
					<SignUpButton buttonSize={buttonSize} />
				)}
				<div className='flex items-center ml-4'>
					<ThemeSwitch />
				</div>
			</div>
			<AvatarMenu userId={userID} name={name} buttonSize={buttonSize} />
		</nav>
	)
}

export default Navbar

type ButtonProps = {
	buttonSize: string
}

export const CreatePromptButton = ({ buttonSize }: ButtonProps) => {
	const { loading, disabled, handleNavigation } =
		useNavigationWithLoading('/create_prompt')
	const color = disabled ? 'gray' : 'orange'

	return (
		<Button
			buttonStyle={{
				color: 'black',
				rounded: 'full',
				size: buttonSize as any,
			}}
			disabled={disabled}
			isLoading={loading}
			onClick={disabled ? undefined : handleNavigation}
			rightIcon={<MdOutlineNoteAdd />}
		>
			Create Prompt
		</Button>
	)
}

export const SignUpButton = ({ buttonSize }: ButtonProps) => {
	const { loading, disabled, handleNavigation } =
		useNavigationWithLoading('/sign_up')
	const color = disabled ? 'gray' : 'orange'

	return (
		<Button
			buttonStyle={{
				color: color,
				rounded: 'full',
				size: buttonSize as any,
			}}
			onClick={disabled ? undefined : handleNavigation}
			isLoading={loading}
			disabled={disabled}
			rightIcon={<FaSignInAlt />}
		>
			Sign Up
		</Button>
	)
}

export const SignOutButton = ({ buttonSize }: ButtonProps) => {
	const [loading, setLoading] = React.useState(false)
	// const { loading, disabled, handleNavigation } = useNavigationWithLoading('/')
	// const color = disabled ? 'gray' : 'orange'

	const handleSignOut = useCallback(async () => {
		setLoading(true)
		await signOut()
	}, [])

	return (
		<Button
			buttonStyle={{
				color: 'black',
				rounded: 'full',
				size: buttonSize as any,
			}}
			// disabled={disabled}
			isLoading={loading}
			onClick={handleSignOut}
			rightIcon={<FaPowerOff />}
		>
			Sign out
		</Button>
	)
}

type ChatgtpButtonProps = {
	buttonSize: 'md' | 'xs'
}

export const ChatgtpButton = ({ buttonSize }: ChatgtpButtonProps) => {
	return (
		<Link href='https://chatgpt.com/' target='_blank'>
			<Button
				buttonStyle={{
					color: 'yellow',
					rounded: 'full',
					size: buttonSize,
				}}
				rightIcon={<FiExternalLink />}
			>
				ChatGTP
			</Button>
		</Link>
	)
}
