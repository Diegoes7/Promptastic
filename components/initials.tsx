import React from 'react'

// Utility function to capitalize the first letter of each word and get initials
export const getInitials = (name: string): string => {
	if (!name || typeof name !== 'string') {
		return ''
	}

	// Split the name by spaces and take the first letter of each word
	const words = name.trim().split(/\s+/) // Splits on one or more spaces
	const initials = words.map((word) => word[0].toUpperCase()).join('') // Get first letter of each word

	return initials
}

// Helper function to hash the string and generate a consistent color
const stringToColor = (str: string): string => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}
	let color = '#'
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		color += ('00' + value.toString(16)).slice(-2)
	}
	return color
}

// React component that sets consistent background and text color based on initials of the name
interface ConsistentColorNameProps {
	name: string
	// width: React.CSSProperties;
	// height: React.CSSProperties;
	width: string
	height: string
	onClick?: () => void
}

const ConsistentColorName = ({
	name,
	height,
	width,
	onClick,
}: ConsistentColorNameProps) => {
	if (!name) return
	const initials = getInitials(name) // Get initials of the name
	const backgroundColor = stringToColor(name) // Consistent background color based on name
	const textColor = stringToColor(name.split('').reverse().join('')) // Different color for text (reversed name)

	return (
		<div
			style={{
				backgroundColor,
				color: textColor,
				padding: '10px',
				borderRadius: '50%',
				display: 'inline-flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: `${width}`,
				height: `${height}`,
				fontWeight: 'bold',
				fontSize: '1.5rem',
			}}
			onClick={onClick}
		>
			<h1
				style={{
					height: '25px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{initials}
			</h1>
		</div>
	)
}

export default ConsistentColorName
