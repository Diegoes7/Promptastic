import Button from './basic/button/Button'

type PopUpProps = {
	isOpen: boolean
	setIsOPen: () => void
	children: React.ReactNode
}

export default function PopUp({ isOpen, setIsOPen, children }: PopUpProps) {
	// const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1')
	// const { data: session } = useSession()
	// const { data } = useMyFavoritePromptsQuery()
	// const myFavorites = data?.myFavoritePrompts

	// Function to close the modal when clicking outside
	const handleOutsideClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			setIsOPen()
		}
	}

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'
			onClick={handleOutsideClick} // Close modal on outside click
		>
			{/* <div className='bg-white p-6 rounded-lg shadow-lg relative flex flex-col justify-between responsive-container'>	 */}
			<div className='bg-white dark:bg-slate-700 px-3 sm:px-6 py-6 rounded-lg shadow-lg relative flex flex-col justify-between responsive-container'>
				{children}
				<div className='flex justify-end mt-4'>
					<Button
						buttonStyle={{ color: 'glassBlue', rounded: 'full', size: 'md' }}
						onClick={setIsOPen}
					>
						Close Modal
					</Button>
				</div>
			</div>

			{/* Close Button (bottom-right corner) */}
		</div>
	)
}
