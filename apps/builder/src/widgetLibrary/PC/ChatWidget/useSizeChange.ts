import { useCallback, useEffect, useRef } from "react"
import { VirtuosoHandle } from "react-virtuoso"

export const useSizeChange = (length: number) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const messageListRef = useRef<VirtuosoHandle | null>(null)
  const containerHeight = useRef(0)

  const setContainerHight = useCallback((height: number) => {
    containerHeight.current = height
  }, [])

  const handleOnSizeChange = useCallback(() => {
    Promise.resolve().then(() => {
      messageListRef.current?.scrollToIndex({
        index: length ? length - 1 : 0,
      })
    })
  }, [length])
  useEffect(() => {
    if (containerRef.current) {
      containerHeight.current = containerRef.current.clientHeight
    }
  }, [containerRef])

  useEffect(() => {
    let observe: HTMLDivElement | null
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          const { height } = entry.contentRect
          if (height !== containerHeight.current) {
            handleOnSizeChange()
            setContainerHight(height)
          }
        }
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
      observe = containerRef.current
    }

    return () => {
      if (observe) {
        resizeObserver.unobserve(observe)
        observe = null
      }
    }
  })

  useEffect(() => {
    handleOnSizeChange()
  }, [handleOnSizeChange, length])
  return {
    messageListRef,
    containerRef,
    handleOnSizeChange,
  }
}
