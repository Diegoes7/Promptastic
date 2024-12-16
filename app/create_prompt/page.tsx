'use client'

import React, { FormEvent } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import PromptForm from '../../components/prompt_form'
import {
	CreatePromptDocument,
	PromptFragment,
	PromptsDocument,
	PromptsQuery,
	useCreatePromptMutation,
	User,
} from '../../generated/graphql'
import Spinner from '../../components/basic/spinner'

export type Post = {
	id?: string
	title: string
	prompt: string
	tag: string
	creator?: User | null | any //  need to make a type
	likes: number
}

const CreatePrompt = () => {
	const [create, { loading }] = useCreatePromptMutation({
		update(cache, { data }) {
			cache.modify({
				fields: {
					prompts(existing = {}) {
						const { prompts = [], hasMore } = existing
						return {
							prompts: [data?.createPrompt, ...prompts],
							hasMore,
						}
					},
				},
			})
		},
	})
	const router = useRouter()
	const { data: session } = useSession()
	const [post, setPost] = useState<Post>({
		title: '',
		prompt: '',
		tag: '',
		likes: 0,
	})

	React.useEffect(() => {
		if (!session) {
			router.push('/')
		}
	}, [session])

	if (loading) {
		;<Spinner />
	}

	const createPrompt = React.useCallback(
		async (e: FormEvent) => {
			e.preventDefault()

			try {
				await create({
					variables: {
						input: post,
					},
				})
				router.push('/')
			} catch (error) {
				console.log(error)
			}
		},
		[post.prompt, post.tag, session?.user]
	)

	return (
		<PromptForm
			type='Create'
			post={post}
			setPost={setPost}
			submitting={loading}
			handleSubmit={createPrompt}
		/>
	)
}

export default CreatePrompt
