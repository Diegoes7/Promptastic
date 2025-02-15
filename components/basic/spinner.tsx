import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { BounceLoader } from 'react-spinners'
import { useTheme } from 'next-themes'

type SpinnerProps = {
	size?: number
	bounce?: boolean
	customColor?: string
}

function Spinner({ customColor, size, bounce }: SpinnerProps) {
	const currentColor = customColor ? customColor : 'rgba(226, 75, 10, 0.85)'
	
	if (bounce) {
		return (
			<div className={`${size} mt-6`}>
				<BounceLoader size={size} color={currentColor} />
			</div>
		)
	}

	return (
		<div className={`${size} mt-6`}>
			<BeatLoader size={size} color={currentColor} />
		</div>
	)
}

export default Spinner
