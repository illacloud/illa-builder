import { FC, ReactNode, useEffect, useRef } from "react"
import {
  autoHeightContainerStyle,
  fixedHeightContainerStyle,
} from "@/widgetLibrary/PublicSector/AutoHeightContainer/style"

interface AutoHeightContainerProps {
  updateComponentHeight: (height: number) => void
  enable?: boolean
  children: ReactNode
}

export const AutoHeightContainer: FC<AutoHeightContainerProps> = ({
  updateComponentHeight,
  children,
  enable = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const containerDom = containerRef.current
    const observerRef = new ResizeObserver((entries) => {
      if (!updateComponentHeight) return
      const height = entries[0].contentRect.height
      updateComponentHeight?.(height)
    })
    if (observerRef && containerDom && enable) {
      observerRef.observe(containerDom)
    }

    return () => {
      if (containerDom && enable) {
        observerRef.unobserve(containerDom)
      }
    }
  }, [enable, updateComponentHeight])

  return (
    <div
      ref={containerRef}
      css={enable ? autoHeightContainerStyle : fixedHeightContainerStyle}
    >
      {children}
    </div>
  )
}
