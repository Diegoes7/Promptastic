'use client'

import { useGetOtherUserQuery, useGetUserPictureQuery } from 'generated/graphql'
import Image from 'next/image'
import React, { ImgHTMLAttributes } from 'react'
import Spinner from './spinner'
import ConsistentColorName from 'components/initials'

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
	const { data: user } = useGetOtherUserQuery({
		variables: {
			getOtherUserId: userId,
		},
	})

	const { data, loading } = useGetUserPictureQuery({
		variables: {
			creatorId: userId,
		},
	})
	const picture = data && data?.getUserPicture?.path
	const image = user?.getOtherUser?.picture || ''
	const imageSource = picture ? picture : image

	if (imageSource === '') {
		return <ConsistentColorName width={'37px'} height={'37px'} name={name} onClick={onClick}/>
	}

	if (loading) {
		return <Spinner bounce={true} size={40} />
	}

	return (
		<Image
			height={height}
			width={width}
			src={imageSource}
			alt={alt}
			data-user-id={userId}
			className={`rounded-full object-fill border-2 border-white ${
				isLarge ? 'h-[5.75em] w-[5.75em]' : 'h-11 w-11'
			}`}
			onClick={onClick}
			{...props}
		/>
	)
}

export default Avatar
