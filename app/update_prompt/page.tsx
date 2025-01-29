'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PromptForm from '../../components/prompt_form'
import {
	useGetPromptByIdQuery,
	useUpdatePromptMutation,
} from '../../generated/graphql'
import { Post } from '@app/create_prompt/page'
import ErrorMessage from 'components/basic/error_message'

const UpdatePrompt = () => {
	const router = useRouter()
	const promptId = useSearchParams().get('id')
	const { data: prompt, error } = useGetPromptByIdQuery({
		variables: {
			getPromptByIdId: parseInt(promptId!),
		},
	})

	const [post, setPost] = useState<Post>({
		prompt: '',
		title: '',
		tag: '',
		likes: 0,
	})

	const [update] = useUpdatePromptMutation({
		onCompleted(data) {
			setPost((prevItem) =>
				prevItem.id === data.updatePrompt.id ? data.updatePrompt : prevItem
			)
		},
	})

	const data1 = prompt?.getPromptById
	console.log(prompt?.getPromptById)
	console.log(data1)
	const [submitting, setIsSubmitting] = useState(false)
	console.log(post)

	useEffect(() => {
		if (data1) {
			setPost(data1)
		}
	}, [data1])

	const updatePrompt = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		if (!promptId) return alert('Missing PromptId!')

		try {
			await update({
				variables: {
					updatePromptId: parseInt(promptId),
					input: {
						prompt: post!.prompt,
						title: post!.title,
						tag: post!.tag,
						likes: post.likes,
					},
				},
			})
			router.push('/')
			console.log('Success')
		} catch (error) {
			console.log(error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<PromptForm
				type='Edit'
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={updatePrompt}
			/>
			{error && <ErrorMessage message={error.message} />}
		</>
	)
}

export default UpdatePrompt
