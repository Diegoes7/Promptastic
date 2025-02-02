import React from 'react'
import { ModalContext } from './context_provider'

const useModal = () => {
	const context = React.useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}

export default useModal
