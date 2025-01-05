'use client'

import React from 'react'
import PromptList from './prompt_list'
import { PromptsQuery, usePromptsQuery } from '../generated/graphql'
import useSearch from '../app/utils/useSearch'
import { Post } from '@app/create_prompt/page'
import Skeleton from './skeleton'
import useInfiniteScroll from '@app/utils/useLoadMore'

const Feed = () => {
	const { data, loading, fetchMore, variables } = usePromptsQuery({
		variables: {
			limit: 10,
			cursor: null,
		},
		notifyOnNetworkStatusChange: true, // loading actually seen, this tell loading is true
	})
	const [searchText, setSearchText] = React.useState('')
	const [posts, setPosts] = React.useState<Post[]>([])

	const allPrompts = data?.prompts?.prompts
	const hasMore = data?.prompts?.hasMore

	const searchedResults = useSearch(searchText, posts)

	React.useEffect(() => {
		if (allPrompts) {
			setPosts(allPrompts)
		}
	}, [allPrompts])

	const handlePagination = () => {
		if (!allPrompts) return
		const cursor1 = allPrompts[allPrompts?.length - 1].createdAt
		const element = allPrompts[allPrompts.length - 1]
		console.log('element: ', element)
		fetchMore({
			variables: {
				limit: variables!.limit,
				cursor: cursor1,
			},
			updateQuery: (previousValue, { fetchMoreResult }): PromptsQuery => {
				if (!fetchMoreResult) {
					return previousValue as PromptsQuery
				}

				return {
					__typename: 'Query',
					prompts: {
						__typename: 'PaginatedPrompts',
						hasMore: fetchMoreResult?.prompts?.hasMore!,
						prompts: [
							...previousValue?.prompts?.prompts!,
							...fetchMoreResult?.prompts?.prompts!,
						],
					},
				}
			},
		})
	}

	//* Infinite scroll hook
	const observerRef = useInfiniteScroll({
		onLoadMore: handlePagination,
		threshold: 0.9, // Trigger at 90% visibility
	})

	const handleSearchChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			//* if (allPrompts && allPrompts?.length > 0) {
			setSearchText(e.target.value)
			// }
		},
		[]
	)

	return (
		<section className='feed'>
			<form className='relative w-2/3 w-full sm:w-full flex justify-center items-center'>
				<input
					type='search'
					placeholder='Search for a tag, prompt or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer text-gray-700'
				/>
			</form>
			{loading && <Skeleton count={6} />}
			{!allPrompts && !loading ? (
				'No Prompts to show!'
			) : (
				<PromptList loading={loading} data={searchedResults} />
			)}
			{/* Trigger Element */}
			{hasMore ? <div ref={observerRef} className='h-1'></div> : null}
		</section>
	)
}

export default Feed
