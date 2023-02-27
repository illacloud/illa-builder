import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

export const useAutoUpdateHeight = (
  handleUpdateHeight: (height: number) => void,
  enable: boolean = true,
  dynamicOptions?: {
    dynamicMinHeight?: number
    dynamicMaxHeight?: number
  },
): [MutableRefObject<HTMLDivElement | null>, number] => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [realHeight, setRealHeight] = useState(0)
  const observerRef = useRef(
    new ResizeObserver((entries) => {
      if (!isMounted.current || !handleUpdateHeight) return
      const height = entries[0].contentRect.height
      setRealHeight(height)
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
    }),
  )

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useLayoutEffect(() => {
    if (observerRef.current && containerRef.current && enable) {
      observerRef.current.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current && enable) {
        observerRef.current.unobserve(containerRef.current)
      }
    }
  }, [dynamicOptions, enable, handleUpdateHeight])
  return [containerRef, realHeight]
}
