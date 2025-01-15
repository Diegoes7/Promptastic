'use client'

import Profile from '../../../components/profile'
import Spinner from '../../../components/basic/spinner'
import {
	useGetOtherUserQuery,
	useGetPromptsUserByIdQuery,
	User,
} from '../../../generated/graphql'
import ErrorMessage from 'components/basic/error_message'

export type ProfileProps = {
	params: {
		id: string
	}
}

const UserProfile = ({ params }: ProfileProps) => {
	const otherUserID = parseInt(params.id)
	const {
		data,
		loading,
		error: errorOtherUser,
	} = useGetOtherUserQuery({
		variables: {
			// getOtherUserId: parseInt(params.id),
			getOtherUserId: otherUserID,
		},
	})
	const userProfile = data?.getOtherUser && data?.getOtherUser
	// const userID = userProfile && parseInt(userProfile?.id)

	const {
		data: prompts,
		loading: promptsLoading,
		error,
	} = useGetPromptsUserByIdQuery({
		variables: {
			getPromptsUserById: otherUserID!,
		},
	})

	const userPrompts = prompts?.getPromptsUserById

	if (promptsLoading) {
		return <Spinner />
	}

	return (
		<>
			{loading && <Spinner />}
			<Profile
				userProfile={userProfile as User}
				desc={`Welcome to ${userProfile?.username}'s personalized profile page. Explore ${userProfile?.username}'s exceptional prompts and be inspired by the power of their imagination`}
				data={userPrompts}
				otherUserID={otherUserID}
				loading={promptsLoading}
			/>
			{error && <ErrorMessage message={error.message} />}
			{errorOtherUser && <ErrorMessage message={errorOtherUser.message} />}
		</>
	)
}

export default UserProfile
