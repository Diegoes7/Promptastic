import React, { FormEvent, useCallback } from 'react'
import {
	DeletePictureDocument,
	useDeletePictureMutation,
	useGetUserFavoritePromptsQuery,
	useGetUserPictureQuery,
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
import { MdCancel } from 'react-icons/md'
import Tooltip from './basic/tooltip'

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

	const { data: userPicture } = useGetUserPictureQuery({
		variables: { creatorId: parseInt((session as SessionUser)?.userID) },
	})
	const pictureID =
		userPicture?.getUserPicture && parseInt(userPicture?.getUserPicture?.id)
	const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation()
	const [deletePicture] = useDeletePictureMutation()

	const profilePath = path === '/profile'
	const nameInitials = profilePath ? session?.user?.name : userName
	const sessionUser = parseInt((session as SessionUser)?.userID)
	const disabledSubmitButton = inputUser === session?.user?.name

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
		[inputUser]
	)

	const handleUploadImage = React.useCallback(() => {
		setImageEditor(!imageEditor)
	}, [imageEditor])

	const handleDeletePicture = useCallback(async (e: FormEvent) => {
		e.preventDefault()

		try {
			await deletePicture({
				variables: {
					deletePictureId: pictureID!,
				},
				update: (cache, { data }) => {
					if (data?.deletePicture) {
						const deletedPictureId = String(pictureID)

						// 1. Evict the deleted picture from the cache
						cache.evict({ id: `Picture:${deletedPictureId}` })

						// 2. Remove it from the pictures list
						cache.modify({
							fields: {
								pictures(existingPictures = [], { readField }) {
									return existingPictures.filter(
										(pic: any) => readField('id', pic) !== deletedPictureId
									)
								},
							},
						})
						// 3. Broadcast the cache changes
						cache.gc()
					}
				},
				onCompleted() {
					alert(
						`Picture with name: '${userPicture?.getUserPicture?.filename.slice(6)}' of type: ${userPicture?.getUserPicture?.mimetype} deleted successfully.`
					)
					console.log('Picture deleted successfully')
				},
				onError(err) {
					console.error('Error deleting picture:', err.message)
				},
			})
		} catch (error) {
			console.log(error)
		}
	}, [])

	const handleSubmit = useCallback(async (e: FormEvent) => {
		e.preventDefault()

		try {
			const response = await updateUser({
				variables: {
					updateUserId: parseInt((session as any).userID),
					username: inputUser!,
				},
			})
			alert(
				`The display name is changed to ${response.data?.updateUser.username} from ${session?.user?.name}.`
			)
		} catch (error) {
			console.log(error)
		}
	}, [inputUser])

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
				<div className='relative group flex flex-col items-center gap-4'>
					<div className='relative'>
						<Avatar
							width={57}
							height={57}
							userId={avatarID}
							name={nameInitials || ''}
							alt='user picture'
							isLarge={true}
						/>
						{!!userPicture?.getUserPicture?.id && (
							<div className='absolute top-1 right-1 p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
								<Tooltip text='Remove picture'>
									<Button
										buttonStyle={{ color: 'red', rounded: 'lg', size: 'xs' }}
										onClick={handleDeletePicture}
									>
										<MdCancel />
									</Button>
								</Tooltip>
							</div>
						)}
					</div>
					{session?.user && profilePath && (
						<div className='mt-2'>
							<Tooltip text='Choose picture and apply it to be your avatar'>
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
							</Tooltip>
						</div>
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
									isLoading={updateUserLoading}
									disabled={disabledSubmitButton}
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
