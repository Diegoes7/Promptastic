'use client'

import React from 'react'
import { Post } from '@app/create_prompt/page'
import PromptCard from './prompt_card'

type OverviewPromptProps = {
	prompt: Post
	index: number
}

const OverviewPrompt = ({ prompt, index }: OverviewPromptProps) => {
	return (
		<div className='w-full relative bg-white dark:bg-slate-700'>
			<div className='group flex basis-full shrink sm:basis-1/2 items-center justify-between w-full bg-blue-200 rounded text-inherit p-2 rounded shadow-md max-h-60 overflow-y-auto'>
				<h4 className='text-black max-w-[60%] '>
					<span className='p-2'>{index}.</span>
					{prompt.title}
				</h4>
				<h4 className='pl-4 text-black'>{prompt.creator?.username}</h4>
				<span className='pl-4 text-black'>p: {prompt.likes}</span>

				<div className='hidden group-hover:block absolute left-1/2 top-[10%] rounded-lg transform -translate-x-1/2 rounded z-[9999] shadow-lg max-w-md bg-white dark:bg-slate-700'>
					<PromptCard post={prompt} handleTagClick={() => {}} />
				</div>
			</div>
		</div>
	)
}

export default OverviewPrompt
