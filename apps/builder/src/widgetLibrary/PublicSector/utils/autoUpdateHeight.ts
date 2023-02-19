import { useEffect, useRef } from "react"

export const useAutoUpdateHeight = (
  handleUpdateHeight: (height: number) => void,
  enable: boolean = true,
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const observer = useRef(
    new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height
      handleUpdateHeight(height)
    }),
  )

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
