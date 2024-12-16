'use client'

import React, { useState } from 'react'
import PopularPrompts from './popular_prompt'
import FavoriteList from './favorite_list'
import { useMyFavoritePromptsQuery } from 'generated/graphql'
import { useSession } from 'next-auth/react'

const MainLists = () => {
	const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1')
	const { data: session } = useSession()
	const { data } = useMyFavoritePromptsQuery()
	const myFavorites = data?.myFavoritePrompts

	return (
		<div>
			{/* Tabs at the Top */}
			<div className='flex space-x-4 mb-4 bg-inherit'>
				<button
					onClick={() => setActiveTab('tab1')}
					className={`px-4 py-2 ${
						activeTab === 'tab1'
							? 'bg-blue-500 text-inherit'
							: 'bg-inherit text-inherit'
					} rounded`}
				>
					Popular
				</button>
				<button
					onClick={() => setActiveTab('tab2')}
					className={`px-4 py-2 ${
						activeTab === 'tab2'
							? 'bg-blue-500 text-inherit'
							: 'bg-inherit text-inherit'
					} rounded`}
				>
					Favorite
				</button>
			</div>

			{/* Content Area (70% height of modal) */}
			<div className='flex-grow overflow-y-auto sm:px-4 p-0'>
				{activeTab === 'tab1' ? (
					<div>
						<PopularPrompts />
					</div>
				) : (
					<div>
						{session?.user ? (
							<FavoriteList extended={true} data={myFavorites} />
						) : (
							'Sign in to see your favorite prompts'
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default MainLists
