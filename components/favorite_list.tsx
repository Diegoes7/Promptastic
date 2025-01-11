'use client'

import React from 'react'
import OverviewPrompt from './overview_prompt'
import Button from './basic/button/Button'
import { MdCancel } from 'react-icons/md'
import {
	MyFavoritePromptsDocument,
	MyFavoritePromptsQuery,
	useRemoveFromFavoritesMutation,
} from 'generated/graphql'
import { User } from './register_form'
import { useNotification } from '@app/utils/useNotification'
import Notification from './basic/notification'
import { useSession } from 'next-auth/react'
// import { MyOwnSession } from '@app/api/auth/authOptions'
import { useParams } from 'next/navigation'

export type FavoriteProps = {
	id: string
	promptId: string
	prompt?: any
	user?: any | User | null | undefined // must be User
}

type FavoriteListProps = {
	data: FavoriteProps[] | undefined | null
	extended?: boolean
	profilePath?: boolean
}

const FavoriteList = ({ data, profilePath, extended }: FavoriteListProps) => {
	const { id } = useParams()
	const { data: session } = useSession()
	const [unLikedPrompt] = useRemoveFromFavoritesMutation()
	const {
		isVisible,
		message,
		onConfirm,
		onCancel,
		showNotification,
		hideNotification,
	} = useNotification()
	console.log(data)

	const handleUnliked = React.useCallback(
		(f: FavoriteProps) => {
			showNotification(
				`${f.user.username}, Are you sure you want to unlike "${f.prompt.title}"?`,
				async () => {
					try {
						await unLikedPrompt({
							variables: {
								promptId: parseInt(f.prompt.id),
							},
							update(cache, { data }) {
								if (data?.removeFromFavorites) {
									// Read the current favorites from the cache
									const existingFavorites =
										cache.readQuery<MyFavoritePromptsQuery>({
											query: MyFavoritePromptsDocument,
										})

									if (existingFavorites) {
										// Filter out the removed favorite using the returned ID
										const updatedFavorites =
											existingFavorites.myFavoritePrompts.filter(
												(item) =>
													item.id !== data.removeFromFavorites.toString()
											)

										// Write the updated favorites list back to the cache
										cache.writeQuery({
											query: MyFavoritePromptsDocument,
											data: {
												myFavoritePrompts: updatedFavorites,
											},
										})
									}
								}
							},
						})
					} catch (error) {
						console.log(error)
					}
					console.log(
						`Unlike ${f.prompt.title} ccreated by "${f.user.username}"`
					)
					hideNotification()
				},
				() => {
					console.log(`Canceled unlike of "${f.prompt.title}"`)
					hideNotification()
				}
			)
		},
		[unLikedPrompt]
	)

	const favList = data?.map((f: FavoriteProps, inx) => {
		return (
			<div
				className='p-1 flex items-center gap-2 bg-white dark:bg-slate-700'
				key={f.id}
			>
				<OverviewPrompt prompt={f.prompt} index={++inx} />
				{profilePath && (
					// session as MyOwnSession).userID === id
					<Button
						className='p-2'
						buttonStyle={{ color: 'black', rounded: 'lg', size: 'xs' }}
						onClick={() => handleUnliked(f)}
					>
						<MdCancel />
					</Button>
				)}
				{isVisible && (
					<Notification
						message={message}
						onConfirm={onConfirm}
						onCancel={onCancel}
					/>
				)}
			</div>
		)
	})

	const extend = extended ? 'w-[90%]' : 'w-[350px]'

	return (
		// <div className={`${extend} pr-4 h-90%`}>
		<div className='relative'>
			<h1 className='pb-4'>My Favorites</h1>
			{/* <section className='h-[300px] w-full w-[360px] min-w-[300px] px-4 pt-4 bg-gray-200 border rounded-md border-blue-300 overflow-y-auto overflow-x-hidden'> */}
			<section
				className={`${extend} pr-4 h-[350px] px-2 pt-2 bg-gray-200 border rounded-md border-blue-300 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-700`}
			>
				<div>
					{favList?.length === 0 ? (
						<span className='w-[70%] p-4 my-8'> You do not have any favorite prompt yet.</span>
					) : (
						favList
					)}
				</div>
			</section>
		</div>
	)
}

export default FavoriteList
