'use client'

import React, { useState } from 'react'
import { useUserQuery } from '../generated/graphql'
import Feed from '../components/feed'
import { useSession } from 'next-auth/react'

const Home = () => {
	// const { data: currentUser } = useUserQuery()
	// const [siteContent, setSiteContent] = useState('')
	// const { data: session, status } = useSession()



	// React.useEffect(() => {
      
	// }, [session])

	return (
		<>
			<section className='w-full flex-center flex-col my-4'>
				<h1 className='head_text text-center text-white'>
					Discover & Share
					<br className='max-md:hidden' />
					<span className='orange_gradient text-center'>
						{' '}
						AI-Powered Prompts
					</span>
				</h1>
				<p className='desc text-center'>
					Promptastic is an open-source AI prompting tool for modern world to
					discover, create and share creative prompts
				</p>
				<Feed />
			</section>
		</>
	)
}

export default Home
