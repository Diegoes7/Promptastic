'use client'

import Profile, { SessionUser } from '../../components/profile'
import Spinner from '../../components/basic/spinner'
import { useGetUserPromptsQuery } from '../../generated/graphql'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const MyProfile = () => {
	const router = useRouter()
	const { data: session } = useSession()
	const { data, loading } = useGetUserPromptsQuery()
	const myPrompts = data?.getUserPrompts || []

	React.useEffect(() => {
		if (!(session as SessionUser)?.userID) {
			router.push('/')
		}
	}, [])

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<Profile
				name='My'
				desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
				data={myPrompts}
				loading={loading}
			/>
		</div>
	)
}

export default MyProfile
