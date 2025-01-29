import React, { ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'

interface TooltipProps {
	text: string // Text to show in the tooltip
	children: ReactNode // Element to hover on
	mode?: boolean
}

const Tooltip = ({ text, children, mode }: TooltipProps) => {
	const [showTooltip, setShowTooltip] = useState(false)
	const [tooltipPosition, setTooltipPosition] = useState<{
		top: number
		left: number
	} | null>(null)

	const handleMouseEnter = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect()
		setTooltipPosition({
			top: rect.top + 30, // Adjust based on the distance you want above the element
			left: rect.right - 60, // 20% to the right (you can adjust this value as needed)
		})
		setShowTooltip(true)
	}

	const handleMouseLeave = () => {
		setShowTooltip(false)
	}

	return (
		<div
			className='relative inline-block'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			{!mode &&
				showTooltip &&
				tooltipPosition &&
				ReactDOM.createPortal(
					<div
						className='absolute bg-gray-600 text-white text-sm rounded px-2 py-2'
						style={{
							top: tooltipPosition.top + window.scrollY, // Adjust for scroll position
							left: tooltipPosition.left + window.scrollX, // Adjust for scroll position
							zIndex: 9999,
						}}
					>
						{text}
					</div>,
					document.body // Render tooltip to the body or another specific element
				)}
		</div>
	)
}

export default Tooltip
