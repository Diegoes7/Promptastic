'use client'

import React from 'react'
import { usePromptsQuery } from 'generated/graphql'
import OverviewPrompt from './overview_prompt'
import Spinner from './basic/spinner'

const PopularPrompts = () => {
	const { data, loading, variables, fetchMore } = usePromptsQuery({
		variables: {
			limit: 10,
			cursor: null,
		},
		notifyOnNetworkStatusChange: true, // loading actually seen, this tell loading is true
	})
	const allPrompts = data?.prompts?.prompts

	const popularPrompts = React.useMemo(() => {
		if (!allPrompts) return [] // Handle case where data is not available

		// Sorting prompts by vote property (highest to lowest)
		return [...allPrompts].sort((a, b) => b.likes - a.likes)
	}, [allPrompts])

	function handlePagination() {
		if (!allPrompts) return
		const cursor1 = allPrompts[allPrompts?.length - 1].createdAt
		const element = allPrompts[allPrompts.length - 1]
		console.log('element: ', element)
		fetchMore({
			variables: {
				limit: variables!.limit,
				cursor: cursor1,
			},
		})
	}

	const popularPromptList = popularPrompts.map((p: any, inx) => (
		// <div className='mb-1 overflow-y-auto overflow-x-hidden'>
		<div className='p-1 rounded-lg' key={p.id}>
			<OverviewPrompt prompt={p} index={++inx} />
		</div>
	))

	if (loading) {
		return <Spinner />
	}

	return (
		<section className='overflow-y-auto rounded-lg p-4 bg-inherit border border-blue-500'>
			<h1 className='pb-2'>Popular Prompts</h1>
			<div className='h-[350px] overflow-auto'>{popularPromptList}</div>
		</section>
	)
}

export default PopularPrompts
