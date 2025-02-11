'use client'

import React from 'react'
import PromptList from './prompt_list'
import { PromptsQuery, usePromptsQuery } from '../generated/graphql'
import useSearch from '../app/utils/useSearch'
import { Post } from '@app/create_prompt/page'
import Skeleton from './skeleton'
import useInfiniteScroll from '@app/utils/useLoadMore'
import ErrorMessage from './basic/error_message'
import { usePathname } from 'next/navigation'

const Feed = () => {
	const location = usePathname()
	const { data, loading, error, fetchMore, variables, refetch } =
		usePromptsQuery({
			variables: {
				limit: 10,
				cursor: null,
			},
			notifyOnNetworkStatusChange: true, // loading actually seen, this tell loading is true
			fetchPolicy: 'cache-and-network',
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

	React.useEffect(() => {
		if (location === '/home') {
			refetch()
		}
	}, [location])

	const handlePagination = () => {
		if (!allPrompts) return
		// const cursor1 = allPrompts[allPrompts?.length - 1].createdAt
		const cursor1 = new Date(allPrompts[allPrompts.length - 1].createdAt)
			.getTime()
			.toString()
		const element = allPrompts[allPrompts.length - 1]
		console.log('element: ', element)
		fetchMore({
			variables: {
				limit: variables!.limit,
				cursor: cursor1,
			},
			updateQuery: (previousValue, { fetchMoreResult }): PromptsQuery => {
				if (!fetchMoreResult) return previousValue

				return {
					__typename: 'Query',
					prompts: {
						__typename: 'PaginatedPrompts',
						hasMore: fetchMoreResult?.prompts?.hasMore!, //& Correctly update `hasMore`
						prompts: [
							...previousValue?.prompts?.prompts!,
							...fetchMoreResult?.prompts?.prompts!,
						], //& Append new prompts
					},
				}
			},
		})
	}

	//$ Infinite scroll hook
	const observerRef = useInfiniteScroll({
		onLoadMore: handlePagination,
		threshold: 0.9, // Trigger at 90% visibility
	})

	const handleSearchChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (allPrompts) {
				setSearchText(e.target.value)
			}
		},
		[posts]
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
			<div className='flex-col align-center justify-center'>
				<h1 className='pb-4 flex justify-center mt-3 text-xl'>
					Last Added Prompts
				</h1>
				<hr className='w-[700px] p-2' />
			</div>
			{loading && <Skeleton count={6} />}
			{allPrompts?.length === 0 && !loading ? (
				<div className='mt-8 text-xl'>No Prompts to show!</div>
			) : (
				<PromptList loading={loading} data={searchedResults} />
			)}

			{/* Trigger Element */}
			{hasMore ? <div ref={observerRef} className='h-1'></div> : null}
			{error && <ErrorMessage message={error.message} />}
		</section>
	)
}

export default Feed
