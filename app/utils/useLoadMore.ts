import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void // Function to load more data
  threshold?: number // Trigger percentage visibility, default is 0.9
  rootMargin?: string // Root margin, default is '0px'
}

const useInfiniteScroll = ({ onLoadMore, threshold = 0.9, rootMargin = '0px' }: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement | null>(null)

  const handleObserver = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        onLoadMore()
      }
    },
    [onLoadMore]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin,
      threshold,
    })

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [handleObserver, rootMargin, threshold])

  return observerRef
}

export default useInfiniteScroll
