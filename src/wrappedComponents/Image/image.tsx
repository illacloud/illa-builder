import { Image } from "@illa-design/image"
import { FC } from "react"
import { WrappedImageProps } from "./interface"
import { withParser } from "../parserHOC"
import { TooltipWrapper } from "../TooltipWrapper"

export const WrappedImage: FC<WrappedImageProps> = (props) => {
  const { src, altText, radius, tooltipText, width, height } = props
  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="top"
    >
      <Image
        fallbackSrc={src}
        alt={altText}
        radius={radius}
        height={height}
        width={width}
      />
    </TooltipWrapper>
  )
}

export const ImageWidget = withParser(WrappedImage)
ImageWidget.displayName = "ImageWidget"
