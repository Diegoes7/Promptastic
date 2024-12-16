import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { BounceLoader } from 'react-spinners'

type SpinnerProps = {
	size?: number
	bounce?: boolean
}

function Spinner({ size, bounce }: SpinnerProps) {
	if (bounce) {
		return (
			<div className={`${size} mt-6`}>
				<BounceLoader size={size} color='rgba(226, 75, 10, 0.85)' />
			</div>
		)
	}

	return (
		<div className={`${size} mt-6`}>
			<BeatLoader size={size} color='rgba(226, 75, 10, 0.85)' />
		</div>
	)
}

export default Spinner
