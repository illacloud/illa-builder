import { useEffect, useRef } from "react"

export const useAutoUpdateHeight = (
  handleUpdateHeight: (height: number) => void,
  enable: boolean = true,
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const isMounted = useRef(false)

  const observer = useRef(
    new ResizeObserver((entries) => {
      if (!isMounted.current) return
      const height = entries[0].contentRect.height
      handleUpdateHeight?.(height)
    }),
  )

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (containerRef.current && enable) {
      observer.current.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current && enable) {
        observer.current.unobserve(containerRef.current)
      }
    }
  }, [enable])
  return [containerRef]
}
