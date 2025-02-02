'use client'

import React from "react"

export const ModalContext = React.createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  toggleModal: () => {},
})


const ModalProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const toggleModal = () => setIsOpen((prev) => !prev)

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, toggleModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider