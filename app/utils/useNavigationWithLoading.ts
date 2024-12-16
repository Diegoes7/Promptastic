'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

type UseNavigationWithLoading = (targetPath: string) => {
  loading: boolean
  disabled: boolean
  handleNavigation: () => void
}

const useNavigationWithLoading: UseNavigationWithLoading = (targetPath) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // `disabled` is true if the current path is the target path
  const disabled = pathname === targetPath

  const handleNavigation = useCallback(() => {

    //Do nothing if already on the target path
    if (pathname === targetPath) return

    setLoading(true)
    router.push(targetPath)
  }, [targetPath, router])

  useEffect(() => {
    if (pathname === targetPath) {
      setLoading(false)
    }
  }, [pathname, targetPath])

  return { loading, disabled, handleNavigation }
}

export default useNavigationWithLoading
