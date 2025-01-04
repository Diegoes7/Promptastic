// import React from 'react'

// type TrancatedTextProps = {
// 	text: string
// }

// const TruncatedText = ({ text }: TrancatedTextProps) => {
// 	const maxLength = 77
// 	return (
// 		<div className='relative group'>
// 			<p className='whitespace-normal break-words'>
// 				{text.length > maxLength ? text.slice(0, maxLength) + '...' : text}
// 			</p>
// 			{/* {text.length > maxLength && ( */}
// 				<div
// 					className='absolute group-hover:flex bg-white text-black text-sm border border-gray-400 rounded-md p-2 z-[9999] w-max max-w-sm shadow-lg'
// 					style={{ top: '-100%', left: '0' }}
// 				>
// 					{text}
// 				</div>
// 			{/* )} */}
// 		</div>
// 	)
// }

// export default TruncatedText

type TruncatedTextProps = {
	text: string
	maxLength: number
	minHeight?: string
}

import React, { useState, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'

const TruncatedText = ({
	text = '',
	minHeight,
	maxLength = 57,
}: TruncatedTextProps) => {
	const [hover, setHover] = useState(false)
	const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
	const ref = useRef<HTMLDivElement>(null)

	const handleMouseEnter = (/*event: React.MouseEvent */) => {
		// Only calculate position and show tooltip if text exceeds maxLength
		if (text.length > maxLength) {
			setHover(true)

			const rect = ref.current?.getBoundingClientRect()
			if (rect) {
				setTooltipPosition({
					top: rect.top + window.scrollY - 10, // Adjust for offset
					left: rect.left + window.scrollX,
				})
			}
		}
	}

	const handleMouseLeave = useCallback(() => setHover(false), [hover])

	return (
		<div
			className={`relative group ${minHeight}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={ref}
		>
			<p className='whitespace-normal break-words'>
				{text.length > maxLength ? text.slice(0, maxLength) + '...' : text}
			</p>
			{hover &&
				ReactDOM.createPortal(
					<div
						className='absolute bg-[#267889] text-white text-sm border border-gray-400 rounded-md p-2 z-[9999] shadow-lg'
						style={{
							position: 'absolute',
							top: tooltipPosition.top,
							left: tooltipPosition.left,
							maxWidth: '300px',
						}}
					>
						{text}
					</div>,
					document.body // Render in the top-most layer
				)}
		</div>
	)
}

export default TruncatedText
