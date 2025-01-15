import {
	MyFavoritePromptsDocument,
	MyFavoritePromptsQuery,
	PromptFragment,
	useAddToFavoritesMutation,
	useMyFavoritePromptsQuery,
	useRemoveFromFavoritesMutation,
} from 'generated/graphql'
import React, { useCallback } from 'react'
import { FcLikePlaceholder } from 'react-icons/fc'
import { FaRegHeart } from 'react-icons/fa'
import Button from './button/Button'
import { useNotification } from '@app/utils/useNotification'
import Notification from '../basic/notification'
import { Post } from '@app/create_prompt/page'
import { useSession } from 'next-auth/react'
import { MyOwnSession } from '@app/api/auth/authOptions'
import ErrorMessage from './error_message'
import Tooltip from './tooltip'

type LikeProps = {
	post: PromptFragment
}

const Like = ({ post }: LikeProps) => {
	const { data: session } = useSession()
	const { data: favorites, error } = useMyFavoritePromptsQuery()
	const [addToFavorite, { loading, error: errorAddFavorite }] =
		useAddToFavoritesMutation()
	const {
		isVisible,
		message,
		onConfirm,
		onCancel,
		showNotification,
		hideNotification,
	} = useNotification()

	const [isLiked, setIsliked] = React.useState(false)

	React.useEffect(() => {
		//* when i click so change liked
		const liked = favorites?.myFavoritePrompts.some(
			(f) => f.prompt?.id === post.id
		)
		setIsliked(!!liked)
	}, [favorites, post.id])

	// if (loading) {
	// 	return <Spinner />
	// }

	const handleFavorite = useCallback(
		async (post: Post) => {
			showNotification(
				`${(session as MyOwnSession).user?.name}, Are you sure you want like "${post.title}"?`,
				async () => {
					try {
						await addToFavorite({
							variables: {
								promptId: parseInt(post.id!), // Assuming post.id is always valid
							},
							update(cache, { data }) {
								if (data?.addToFavorites) {
									// Read the current favorites from the cache
									const existingFavorites =
										cache.readQuery<MyFavoritePromptsQuery>({
											query: MyFavoritePromptsDocument,
										})

									if (existingFavorites) {
										// Add the new favorite to the cache
										cache.writeQuery({
											query: MyFavoritePromptsDocument,
											data: {
												myFavoritePrompts: [
													...existingFavorites.myFavoritePrompts,
													data.addToFavorites,
												],
											},
										})
									}
								}
							},
						})
					} catch (error) {
						console.error('Error adding to favorites:', error)
					}
					hideNotification()
				},
				() => {
					console.log(`Canceled adding "${post.title}" to favorites.`)
					hideNotification()
				}
			)
		},
		[addToFavorite, session, showNotification, hideNotification]
	)

	// const prompt = favorites?.myFavoritePrompts.filter(
	// 	(f) => f.prompt.id === post.id
	// )[0]

	const [unLikedPrompt] = useRemoveFromFavoritesMutation()

	const handleUnliked = useCallback(
		async (post: Post) => {
			showNotification(
				`${(session as MyOwnSession).user?.name}, Are you sure you want unlike "${post.title}"?`,
				async () => {
					try {
						await unLikedPrompt({
							variables: {
								promptId: parseInt(post.id!), // Assuming post.id is valid
							},
							update(cache, { data }) {
								if (data?.removeFromFavorites) {
									// Read the current favorites from the cache
									const existingFavorites =
										cache.readQuery<MyFavoritePromptsQuery>({
											query: MyFavoritePromptsDocument,
										})

									if (existingFavorites) {
										// Remove the unfavorited item from the cache
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
						setIsliked(false) // Optimistic UI update
					} catch (error) {
						console.error('Error removing from favorites:', error)
					}
					hideNotification()
				},
				() => {
					console.log(`Canceled removing "${post.title}" from favorites.`)
					hideNotification()
				}
			)
		},
		[unLikedPrompt, session, showNotification, hideNotification]
	)

	return (
		<div className='flex gap-3 pt-1'>
			{isLiked ? (
				<Tooltip text='Remove from your collection'>
				<Button
					buttonStyle={{ color: 'pink', rounded: 'full', size: 'xs' }}
					onClick={() => handleUnliked(post)}
					leftIcon={<FcLikePlaceholder className='mr-2' />}
				>
					Liked
				</Button>
				</Tooltip>
			) : (
				<Tooltip text='Add this prompt to your collection for easy access'>
					<Button
						buttonStyle={{ color: 'pink', rounded: 'full', size: 'xs' }}
						onClick={() => handleFavorite(post)}
						leftIcon={<FaRegHeart className='mr-2' />}
					>
						Like
					</Button>
				</Tooltip>
			)}
			{isVisible && (
				<Notification
					message={message}
					onConfirm={onConfirm}
					onCancel={onCancel}
				/>
			)}
			{error && <ErrorMessage message={error.message} />}
			{errorAddFavorite && <ErrorMessage message={errorAddFavorite.message} />}
		</div>
	)
}

export default Like

//* Can get my favorites from session.userID, get the user.favorites
