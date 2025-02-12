'use client'

import React from 'react'
import { usePromptsQuery } from 'generated/graphql'
import OverviewPrompt from './overview_prompt'
import Spinner from './basic/spinner'

const PopularPrompts = () => {
	const { data, loading /*variables, fetchMore */ } = usePromptsQuery({
		variables: {
			limit: 100,
			cursor: null,
		},
		fetchPolicy: 'cache-and-network',
	})
	const allPrompts = data?.prompts?.prompts

	const popularPrompts = React.useMemo(() => {
		if (!allPrompts) return []

		// Remove duplicates by id using a Map
		const uniquePromptsMap = new Map()
		allPrompts.forEach((prompt) => {
			uniquePromptsMap.set(prompt.id, prompt)
		})

		// Convert back to array and sort by likes
		return Array.from(uniquePromptsMap.values())
			.sort((a, b) => b.likes - a.likes)
			.slice(0, 20)
	}, [allPrompts])

	//! still need to think about it
	// function handlePagination() {
	// 	if (!allPrompts) return
	// 	const cursor1 = allPrompts[allPrompts?.length - 1].createdAt
	// 	const element = allPrompts[allPrompts.length - 1]
	// 	console.log('element: ', element)
	// 	fetchMore({
	// 		variables: {
	// 			limit: variables!.limit,
	// 			cursor: cursor1,
	// 		},
	// 	})
	// }

	const popularPromptList = popularPrompts.map((p: any, inx) => (
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
