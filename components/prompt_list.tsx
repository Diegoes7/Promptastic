import React from 'react'
import PromptCard from './prompt_card'
import { Post } from '@app/create_prompt/page'
import Skeleton from './skeleton'
import { usePathname } from 'next/navigation'
import { useWindowWidth } from '@app/utils/window_width'

type PromptListProps = {
	data: Post[] | undefined | null
	loading: boolean
}

const PromptList = ({ data, loading }: PromptListProps) => {
	const path = usePathname()

	if (loading) {
		return <Skeleton />
	}

	//& Handle null/undefined data
	const validData = data || []
	//& Filter out invalid posts and deduplicate
	const uniqueData = Array.from(new Set(validData.filter((post) => post?.id)))

	return (
		<div className='relative flex flex-col align-center'>
			{path !== '/' && (
				<h1 className='pb-4 flex justify-center text-xl'>Prompts</h1>
			)}
			{uniqueData.length > 0 ? (
				<div className='flex flex-wrap gap-4 flex-col md:flex-row justify-center'>
					{[...uniqueData].map((p: Post) => (
						<PromptCard post={p} key={p.id} handleTagClick={() => {}} />
					))}
				</div>
			) : (
				<div className='text-xl w-[17rem] p-4 mb-4 flex justify-center'>
					Nothing to show!
				</div>
			)}
		</div>
	)
}

export default PromptList
