import { useLayoutEffect } from "react"

export const useAutoUpdateCanvasHeight = (
  handleUpdateHeight: (height: number) => void,
  containerDom: HTMLElement | null,
  enable: boolean = true,
) => {
  useLayoutEffect(() => {
    const observerRef = new ResizeObserver((entries) => {
      if (!handleUpdateHeight) return
      const height = entries[0].contentRect.height
      handleUpdateHeight(height)
    })
    if (observerRef && containerDom && enable) {
      observerRef.unobserve(containerDom)
      observerRef.observe(containerDom)
    }

    return () => {
      if (containerDom && enable) {
        observerRef.unobserve(containerDom)
      }
    }
  }, [containerDom, enable, handleUpdateHeight])
}
