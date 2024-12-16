import { useState } from 'react'

export const useNotification = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => { })
  const [onCancel, setOnCancel] = useState<() => void>(() => () => { })

  const showNotification = (
    message: string,
    confirmCallback: (v: string | any) => void,
    cancelCallback: () => void
  ) => {
    setMessage(message)
    setOnConfirm(() => confirmCallback)
    setOnCancel(() => cancelCallback)
    setIsVisible(true)
  }

  const hideNotification = () => {
    setIsVisible(false)
  }

  return {
    isVisible,
    message,
    onConfirm,
    onCancel,
    showNotification,
    hideNotification,
  }
}
