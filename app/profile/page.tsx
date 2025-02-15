'use client'

import Profile from '../../components/profile'
import Spinner from '../../components/basic/spinner'
import { useGetUserPromptsQuery } from '../../generated/graphql'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ErrorMessage from 'components/basic/error_message'

const MyProfile = () => {
	const router = useRouter()
	const { data: session, status } = useSession()
	const { data, loading, error } = useGetUserPromptsQuery({
		fetchPolicy: 'cache-and-network',
		skip: status !== 'authenticated', // Skip query if not authenticated
	})

	React.useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/')
		}
	}, [status, router])

	if (status === 'loading') {
		return <Spinner />
	}

	if (!session?.user) {
		return null // Session check failed, will redirect
	}

	return (
		<div>
			<Profile
				name='My'
				desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
				data={data?.getUserPrompts || []}
				loading={loading}
			/>
			{error && <ErrorMessage message={error.message} />}
		</div>
	)
}

export default MyProfile
