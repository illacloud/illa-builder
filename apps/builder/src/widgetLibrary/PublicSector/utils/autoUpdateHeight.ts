import { useEffect, useRef } from "react"

export const useAutoUpdateHeight = (
  handleUpdateHeight: (height: number) => void,
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const observer = useRef(
    new ResizeObserver((entries) => {
      console.log("entries", entries)
      const height = entries[0].contentRect.height
      handleUpdateHeight(height)
    }),
  )

  useEffect(() => {
    if (containerRef.current) {
      observer.current.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.current.unobserve(containerRef.current)
      }
    }
  }, [])
  return [containerRef]
}
