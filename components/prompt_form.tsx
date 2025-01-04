import React, { FormEvent } from 'react'
import Link from 'next/link'
import { Post } from '../app/create_prompt/page'
import { InputField, TextAreaField } from './basic/form_fields'
import Button from './basic/button/Button'
import { MdOutlineCancelScheduleSend } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { MdAddToPhotos } from 'react-icons/md'
import { useRouter, usePathname } from 'next/navigation'

type FormProps = {
	type: string
	post: Post
	setPost: (p: Post) => void
	submitting: boolean
	handleSubmit: (e: FormEvent) => void
}

const PromptForm = ({
	type,
	post,
	setPost,
	submitting,
	handleSubmit,
}: FormProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		const updatedPost = { ...post, [name]: value }
		if (updatedPost) {
			setPost(updatedPost)
		}
	}

	const handleCancel = () => {
		router.push('/') // Navigates to the homepage
	}

	return (
		<section className='w-full max-w-full flex-start flex-col px-6'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{type} Prompt</span>
			</h1>
			<p className='desc text-left max-w-md'>
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform
			</p>
			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
			>
				<InputField
					htmlFor='title'
					name='title'
					label='Prompt Title'
					subTitle='(#Graphql-Setup, ect.)'
					handleChange={handleChange}
					inputValue={post.title}
					placeholder='Type meaningful to you name'
					className='form_input'
				/>
				<TextAreaField
					textareaValue={post.prompt}
					handleChange={handleChange}
					label='Your AI Prompt'
					placeholder='Write your prompt content here'
					name='prompt'
					htmlFor='prompt'
					required
					className='form_textarea'
				/>
				<InputField
					id='tag'
					inputValue={post.tag}
					handleChange={handleChange}
					name='tag'
					htmlFor='tag'
					label='Tag'
					subTitle='Area of knowledge'
					placeholder='#Tag'
					key={post.id}
					required
					className='form_input'
				/>
				<div className='flex-end mx-3 mb-5 gap-4'>
					<Link href='/' className='text-gray-500 text-sm'>
						<Button
							buttonStyle={{ color: 'gray', rounded: 'full', size: 'md' }}
							rightIcon={<MdOutlineCancelScheduleSend />}
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</Link>
					{pathname === '/update_prompt' && post.prompt.length > 0 ? (
						<Button
							type='submit'
							isLoading={submitting}
							buttonStyle={{ color: 'glassBlue', rounded: 'full', size: 'md' }}
							rightIcon={<AiFillEdit />}
						>
							Update Prompt
						</Button>
					) : (
						<Button
							type='submit'
							isLoading={submitting}
							buttonStyle={{ color: 'glassBlue', rounded: 'full', size: 'md' }}
							leftIcon={<MdAddToPhotos />}
						>
							Create Prompt
						</Button>
					)}
				</div>
			</form>
		</section>
	)
}

export default PromptForm
