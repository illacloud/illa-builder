import { Image } from "@illa-design/image"
import { FC, useMemo } from "react"
import { WrappedImageProps } from "./interface"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"

export const WrappedImage: FC<WrappedImageProps> = (props) => {
  const { src, altText, radius, tooltipText, width, height } = props

  const finalRadius = useMemo(() => {
    const reg = /^\d+$/
    const pattern = new RegExp(reg)
    if (pattern.test(radius)) {
      return radius + "px"
    }
    return radius
  }, [radius])

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="top"
    >
      <Image
        fallbackSrc={src}
        alt={altText}
        radius={finalRadius}
        height={height}
        width={width}
      />
    </TooltipWrapper>
  )
}

WrappedImage.displayName = "ImageWidget"

export const ImageWidget = WrappedImage
