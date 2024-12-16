import React from 'react'
import PromptCard from './prompt_card'
import { Post } from '@app/create_prompt/page'
import Skeleton from './skeleton'

type PromptListProps = {
	// data: PromptFragment[] | undefined | null
	data: Post[] | undefined | null
	loading: boolean
}

const PromptList = ({ data, loading }: PromptListProps) => {
	if (loading) {
		return <Skeleton />
	}

	const uniqueData = new Set(data)

	return (
		<div className='relative flex flex-col align-center'>
			<h1 className='pb-4 flex justify-center'>Prompts</h1>
			<div className='flex flex-wrap gap-4 flex-col md:flex-row justify-center'>
				{[...uniqueData].map((p: Post) => (
					<PromptCard post={p} key={p.id} handleTagClick={() => {}} />
				))}
			</div>
		</div>
	)
}

export default PromptList
