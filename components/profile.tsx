import React, { FormEvent, useCallback } from 'react'
import {
	useGetUserFavoritePromptsQuery,
	useMyFavoritePromptsQuery,
	User,
	useUpdateUserMutation,
} from '../generated/graphql'
import PromptList from './prompt_list'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { Post } from '@app/create_prompt/page'
import FavoriteList from './favorite_list'
import Avatar from './basic/avatar'
import PopUp from './pop_up'
import AvatarUploader from './image_editor'
import Button from './basic/button/Button'
import { usePathname, useRouter } from 'next/navigation'
import { InputField, StaticField } from './basic/form_fields'
import { formatDate } from '@app/utils/format_date'

type ProfileProps = {
	userProfile?: User | undefined | null
	desc: string
	data: Post[] | undefined | null
	name?: string
	loading: boolean
	otherUserID?: number
}

export type SessionUser = {
	createdAt: string
	userID: string
} & Session

const Profile = ({
	userProfile,
	desc,
	data,
	name,
	loading,
	otherUserID,
}: ProfileProps) => {
	const userName = userProfile ? userProfile.username : name || ''
	const path = usePathname()
	const { data: session } = useSession()
	const [inputUser, setInputUser] = React.useState(session?.user?.name)
	const [imageEditor, setImageEditor] = React.useState(false)
	const { data: loggedInFavorites } = useMyFavoritePromptsQuery()
	const [updateUser] = useUpdateUserMutation()

	const profilePath = path === '/profile'
	const nameInitials = profilePath ? session?.user?.name : userName
	const sessionUser = parseInt((session as SessionUser)?.userID)

	const avatarID = otherUserID
		? // ? parseInt(otherUserID)
			otherUserID
		: parseInt((session as SessionUser)?.userID)

	const { data: userFavorites } = useGetUserFavoritePromptsQuery({
		variables: { userId: avatarID },
	})

	const usedFavorites = !!userProfile
		? userFavorites?.getUserFavoritePrompts
		: loggedInFavorites?.myFavoritePrompts

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			// Handle the case where an event is passed
			const name = e.target.value
			setInputUser(name)
		},
		[]
	)

	const handleUploadImage = React.useCallback(() => {
		setImageEditor(!imageEditor)
	}, [imageEditor])

	const handleSubmit = useCallback(async (e: FormEvent) => {
		e.preventDefault()

		try {
			const response = await updateUser({
				variables: {
					updateUserId: parseInt((session as any).userID),
					username: inputUser!,
				},
			})
			console.log(response)

			alert(`Submitted ${response.data?.updateUser.username}`)
		} catch (error) {
			console.log(error)
		}
	}, [])

	if (imageEditor) {
		return (
			<PopUp onClose={handleUploadImage} isOpen={imageEditor}>
				<AvatarUploader userId={sessionUser} />
			</PopUp>
		)
	}

	return (
		<section className='w-full pl-[1em] xs:px-4'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{userName} Profile</span>
			</h1>
			<p className='desc text-left'>{desc}</p>
			<div className='flex mt-6 gap-10 border-b border-gray-400 p-8 w-300px flex-col sm:flex-row'>
				<div className='flex flex-col gap-2 content-around items-center justify-evenly'>
					<Avatar
						width={57}
						height={57}
						userId={avatarID}
						name={nameInitials || ''}
						alt='user picture'
						isLarge={true}
					/>
					{session?.user && profilePath && (
						<Button
							onClick={handleUploadImage}
							buttonStyle={{
								color: 'glassBlue',
								rounded: 'full',
								size: 'xs',
							}}
						>
							Upload Picture
						</Button>
					)}
				</div>
				<div className='flex-col self-center items-center sm:flex-start'>
					{session?.user && profilePath ? (
						<form onSubmit={handleSubmit} className='pb-4'>
							<div className='flex h-100%'>
								<InputField
									label='User Name'
									subTitle=''
									inputValue={inputUser || ''}
									handleChange={handleChange}
									htmlFor='username'
									id='username'
									name='username'
									className='ml-4'
								/>
								<Button
									type='submit'
									buttonStyle={{
										color: 'glassBlue',
										rounded: 'normal',
										size: 'md',
										align: 'bottom',
										HSpace: 'sm',
									}}
									style={{ marginBottom: '.3em' }}
								>
									Submit
								</Button>
							</div>
						</form>
					) : (
						<StaticField
							label='User Name: '
							content={
								!userProfile ? session?.user?.name : userProfile?.username
							}
						/>
					)}
					<StaticField
						label='Email: '
						content={!userProfile ? session?.user?.email : userProfile?.email}
					/>
					<StaticField
						label='Created At: '
						content={
							!userProfile
								? formatDate((session as SessionUser)?.createdAt)
								: formatDate(userProfile?.createdAt)
						}
					/>
				</div>
			</div>

			<div className='mt-10 p-2 flex flex-col md:flex-row gap-6 items-center md:items-start md:justify-start justify-center'>
				<PromptList loading={loading} data={data} />
				<FavoriteList profilePath={profilePath} data={usedFavorites} />
			</div>
		</section>
	)
}

export default Profile
