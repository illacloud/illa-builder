import { useEffect, useRef } from "react"

export const useAutoUpdateHeight = (
  handleUpdateHeight: (height: number) => void,
  enable: boolean = true,
  dynamicOptions?: {
    dynamicMinHeight?: number
    dynamicMaxHeight?: number
  },
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!isMounted.current) return
      const height = entries[0].contentRect.height
      if (
        dynamicOptions &&
        dynamicOptions.dynamicMaxHeight &&
        height >= dynamicOptions.dynamicMaxHeight - 6
      ) {
        handleUpdateHeight(dynamicOptions.dynamicMaxHeight - 6)
        return
      }
      if (
        dynamicOptions &&
        dynamicOptions.dynamicMinHeight &&
        height <= dynamicOptions.dynamicMinHeight - 6
      ) {
        handleUpdateHeight(dynamicOptions.dynamicMinHeight - 6)
        return
      }

      handleUpdateHeight?.(height)
    })
    if (containerRef.current && enable) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current && enable) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [dynamicOptions, enable, handleUpdateHeight])
  return [containerRef]
}
