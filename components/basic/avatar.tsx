'use client'

import { useGetOtherUserQuery, useGetUserPictureQuery } from 'generated/graphql'
import Image from 'next/image'
import React, { ImgHTMLAttributes } from 'react'
import Spinner from './spinner'
import ConsistentColorName from 'components/initials'
import ErrorMessage from './error_message'

type AvatarProps = {
	height: number
	width: number
	// src:  string
	alt: string
	name: string
	userId: number
	isLarge?: boolean
} & ImgHTMLAttributes<HTMLImageElement>

const Avatar = ({
	height,
	width,
	alt,
	userId,
	name,
	onClick,
	isLarge,
	...props
}: AvatarProps) => {
	const { data: user, error: errorOtherUser } = useGetOtherUserQuery({
		variables: {
			getOtherUserId: userId,
		},
	})

	const { data, loading, error } = useGetUserPictureQuery({
		variables: {
			creatorId: userId,
		},
	})
	const picture = data && data?.getUserPicture?.path
	const image = user?.getOtherUser?.picture || ''
	const imageSource = picture ? picture : image

	if (imageSource === '') {
		return (
			<ConsistentColorName
				width={'1.83em'}
				height={'1.83em'}
				name={name}
				onClick={onClick}
			/>
		)
	}

	if (loading) {
		return <Spinner bounce={true} size={40} />
	}

	return (
		<div className='min-w-[50px]'>
			<Image
				height={height}
				width={width}
				src={imageSource}
				alt={alt}
				data-user-id={userId}
				className={`rounded-full object-fill border-2 border-white ${
					isLarge ? 'h-[5.90em] w-[5.90em]' : 'h-11 w-11'
				}`}
				onClick={onClick}
				{...props}
			/>
			{error && <ErrorMessage message={error.message} />}
			{errorOtherUser && <ErrorMessage message={errorOtherUser.message} />}
		</div>
	)
}

export default Avatar
