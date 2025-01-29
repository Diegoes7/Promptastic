'use client'

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Post } from '../app/create_prompt/page'
import {
	PromptFragment,
	PromptsDocument,
	useDeletePromptMutation,
	useUpdateLikesMutation,
} from '../generated/graphql'
import { SessionUser } from './profile'

import Avatar from './basic/avatar'
// import Spinner from './basic/spinner'
import Like from './basic/like'
import { useNotification } from '@app/utils/useNotification'
import Notification from './basic/notification'
import Button from './basic/button/Button'
import { AiFillEdit } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'
import TruncatedText from './basic/trancate._text'
import Tooltip from './basic/tooltip'

type PromptCardProps = {
	post: PromptFragment | any
	handleTagClick: (t: string) => void
	mode?: boolean
}

const PromptCard = ({ post, handleTagClick, mode }: PromptCardProps) => {
	const { data: session } = useSession()
	const [deletePrompt, { loading }] = useDeletePromptMutation({
		refetchQueries: [PromptsDocument],
	})

	const [updateLikes] = useUpdateLikesMutation({
		// refetchQueries: [PromptsDocument],
		update(cache, { data }) {
			if (data?.updateLikes) {
				cache.modify({
					id: cache.identify({ __typename: 'Prompt', id: post.id }), // Use post.id here
					fields: {
						likes(existingLikes = 0) {
							return existingLikes + 1 // Increment likes
						},
					},
				})
			}
		},
	})
	const {
		isVisible,
		message,
		onConfirm,
		onCancel,
		showNotification,
		hideNotification,
	} = useNotification()

	const router = useRouter()
	const [copied, setCopied] = useState('')

	const userId = parseInt(post.creator?.id || post.creatorId)
	const username = post.creator?.username

	const handleEdit = useCallback((post: Post) => {
		//! need to close the pop_up modal when go to the page
		router.push(`/update_prompt?id=${post.id}`)
	}, [])

	const handleDelete = useCallback(
		async (post: Post) => {
			showNotification(
				`${post.creator.username}, Are you sure you want to delete "${post.title}"?`,
				async () => {
					try {
						await deletePrompt({
							variables: {
								deletePromptId: parseInt(post.id!),
							},
						})
					} catch (error) {
						console.error('Error deleting prompt:', error)
					}
					hideNotification()
				},
				() => {
					console.log(`Canceled deletion of "${post.title}"`)
					hideNotification()
				}
			)
		},
		[deletePrompt]
	)

	const handleProfileClick = () => {
		if (post.creatorId === (session as any)?.userID) {
			router.push('/profile')
		}

		router.push(`/profile/${post.creatorId}?name=${post.creator?.username}`)
	}

	const handleCopy = useCallback(async () => {
		setCopied(post.prompt)
		navigator.clipboard.writeText(post.prompt)

		try {
			await updateLikes({
				variables: {
					updateLikesId: parseInt(post.id),
				},
			})
		} catch (error) {
			console.log(error)
		}

		setTimeout(() => setCopied(''), 5000)
	}, [post])

	// if (loading) {
	// 	return <Spinner />
	// }

	return (
		<>
			<div className='prompt_card shadow-lg rounded text-inherit'>
				<div className='copy_btn' onClick={handleCopy}>
					<Tooltip text='Click to copy the content'>
						<Image
							src={
								copied === post.prompt
									? '/assets/icons/tick.svg'
									: '/assets/icons/copy.svg'
							}
							alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
							width={12}
							height={12}
						/>
					</Tooltip>
				</div>
				<div className='min-w-[230px] cursor-pointer'>
					<div className='flex items-center gap-4'>
						<Tooltip mode={mode} text={`Go to ${username} account details`}>
							<Avatar
								width={37}
								height={37}
								userId={userId}
								name={username}
								alt='user picture'
								onClick={handleProfileClick}
							/>
						</Tooltip>
						<div className='flex flex-col gap-x-4 w-full'>
							<h3 className='w-[85%] truncate whitespace-nowrap overflow-hidden text-ellipsis font-satoshi font-semibold text-gray-900 text-inherit'>
								<TruncatedText
									maxLength={17}
									minHeight=''
									text={username || ''}
									overviewMode={mode}
								/>
							</h3>
							<div className='p-1 font-inter text-sm text-gray-500 break-words whitespace-normal'>
								<TruncatedText
									maxLength={17}
									minHeight=''
									text={post.creator?.email}
									overviewMode={mode}
								/>
							</div>
						</div>
					</div>
					<div className='my-4 font-satoshi text-sm text-gray-700 text-inherit'>
						<TruncatedText
							maxLength={57}
							minHeight='min-h-[3em]'
							text={post.title}
							overviewMode={mode}
						/>
					</div>
					<div className='my-4 font-satoshi text-sm text-gray-700 max-w-[90%] text-inherit'>
						<TruncatedText
							maxLength={57}
							minHeight='min-h-[3em]'
							text={post.prompt}
							overviewMode={mode}
						/>
					</div>
					<p
						className='font-inter text-sm blue_gradient cursor-pointer'
						onClick={() => handleTagClick && handleTagClick(post.tag)}
					>
						# {post.tag}
					</p>

					<div className='flex items-center justify-center gap-4 w-[90%] pt-2 border-t border-gray-100'>
						{!session?.user ? null : +(session as SessionUser)?.userID ===
						  post.creatorId ? (
							<div className='flex gap-3 pt-1'>
								<Tooltip text='Change the content of your prompt'>
									<Button
										onClick={() => handleEdit(post)}
										// isLoading={submitting}
										buttonStyle={{
											color: 'green',
											rounded: 'full',
											size: 'xs',
										}}
										leftIcon={<AiFillEdit />}
									>
										Edit
									</Button>
								</Tooltip>
								<Tooltip text='Delete permanently the prompt'>
									<Button
										onClick={() => handleDelete(post)}
										// isLoading={submitting}
										buttonStyle={{
											color: 'red',
											rounded: 'full',
											size: 'xs',
										}}
										leftIcon={<MdDeleteForever />}
									>
										Delete
									</Button>
								</Tooltip>
							</div>
						) : (
							<Like post={post} />
						)}
					</div>
				</div>
			</div>
			{isVisible && (
				<Notification
					message={message}
					onConfirm={onConfirm}
					onCancel={onCancel}
				/>
			)}
		</>
	)
}

export default PromptCard
