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
import Tooltip from './basic/tooltip'
import { useTheme } from 'next-themes'
import useModal from '@app/utils/useModal'
import customLoader from './basic/custom_image_loader'

const Navbar = () => {
	const { openModal, toggleModal, isOpen } = useModal()
	const width = useWindowWidth()
	const theme = useTheme()
	const { data: session } = useSession()
	const [isClient, setIsClient] = React.useState(false)

	const userID = session?.user && parseInt((session as MyOwnSession).userID!)
	const name = session?.user?.name || ''
	const buttonSize = width > 600 ? 'md' : 'xs'
	const theme1 = theme?.theme === 'dark' ? 'light' : 'dark'

	React.useEffect(() => {
		setIsClient(true) //! resolve differences between back & front end /hydration
	}, [])

	return (
		<nav className='flex-between gap-1 items-center w-full mb-6 pt-6 customSticky shadow-lg text-base sm:text-sm custom-px:text-xs'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Tooltip text='Go to home page'>
					<Image
						loader={customLoader}
						src='/assets/images/logo.svg'
						alt='Promptastic logo'
						width={37}
						height={37}
						className='object-contain'
					/>
				</Tooltip>
				{
					<span className='logo-text'>
						{isClient && width > 500 ? 'Promptastic' : ''}
					</span>
				}
			</Link>
			<Tooltip text='Check most popular and your favorite prompts'>
				<Button
					onClick={openModal}
					buttonStyle={{
						color: 'glassBlue',
						rounded: 'full',
						size: buttonSize,
					}}
					rightIcon={<FaMedal />}
				>
					Trendy
				</Button>
			</Tooltip>
			<ChatgtpButton buttonSize={buttonSize} />

			<Popup onClose={toggleModal} isOpen={isOpen}>
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
								<Tooltip text='Avatar'>
									<Avatar
										width={38}
										height={38}
										userId={userID!}
										name={name}
										alt='user picture'
									/>
								</Tooltip>
							)}
						</Link>
					</div>
				) : (
					<SignUpButton buttonSize={buttonSize} />
				)}
				<div className='flex items-center ml-4 hover:scale-110 transition-transform duration-300'>
					<Tooltip text={`Switch to ${theme1} mode`}>
						<ThemeSwitch />
					</Tooltip>
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

	return (
		<Tooltip text='Go to the prompt form'>
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
		</Tooltip>
	)
}

export const SignUpButton = ({ buttonSize }: ButtonProps) => {
	const { loading, disabled, handleNavigation } =
		useNavigationWithLoading('/sign_up')

	return (
		<Tooltip text='Navigate to sing in and sign up page'>
			<Button
				buttonStyle={{
					color: 'orange',
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
		</Tooltip>
	)
}

export const SignOutButton = ({ buttonSize }: ButtonProps) => {
	const [loading, setLoading] = React.useState(false)

	const handleSignOut = useCallback(async () => {
		setLoading(true)
		await signOut()
	}, [])

	return (
		<Tooltip text='Sign out from the app'>
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
		</Tooltip>
	)
}

type ChatgtpButtonProps = {
	buttonSize: 'md' | 'xs'
}

export const ChatgtpButton = ({ buttonSize }: ChatgtpButtonProps) => {
	return (
		<Link href='https://chatgpt.com/' target='_blank'>
			<Tooltip text='Test prompts in AI'>
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
			</Tooltip>
		</Link>
	)
}
