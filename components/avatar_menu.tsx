'use client'

import { useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { SignUpButton } from './navbar'
import Button from './basic/button/Button'
import Avatar from './basic/avatar'
import ThemeSwitch from './switch_theme'

type AvatarMenuProp = {
	// image: string
	userId?: number
	name: string
	buttonSize: string
}

const AvatarMenu = ({ userId, name, buttonSize }: AvatarMenuProp) => {
	const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
	const handleSignOut = useCallback(() => {
		setToggleDropdown(false)
		signOut()
	}, [])

	return (
		<div className='md:hidden flex items-center gap-2 relative'>
			{userId ? (
				<div className='flex cursor-pointer'>
					<Avatar
						width={37}
						height={37}
						// src={image}
						userId={userId}
						name={name}
						alt='user picture'
						onClick={() => setToggleDropdown(!toggleDropdown)}
					/>
					{toggleDropdown && (
						<div className='dropdown'>
							<Link
								href='/profile'
								className='dropdown_link'
								onClick={() => setToggleDropdown(false)}
							>
								My profile
							</Link>
							<Link
								href='/create_prompt'
								className='dropdown_link'
								onClick={() => setToggleDropdown(false)}
							>
								Create Prompt
							</Link>
							<Button
								className='dropdown_link'
								buttonStyle={{
									// color: 'none',
									rounded: 'none',
									size: 'xs',
								}}
								onClick={handleSignOut}
							>
								Sign out
							</Button>
						</div>
					)}
				</div>
			) : (
				<SignUpButton buttonSize={buttonSize} />
			)}
			<ThemeSwitch />
		</div>
	)
}

export default AvatarMenu