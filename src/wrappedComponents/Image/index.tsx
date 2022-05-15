import { Image } from "@illa-design/image"
import { FC } from "react"
import { WrappedImageProps } from "./interface"
import TooltipWrapper from "../TooltipWrapper"

const WrappedImage: FC<WrappedImageProps> = (props) => {
  const { src, altText, radius, tooltipText } = props
  return (
    <TooltipWrapper
      content={tooltipText}
      disabled={!tooltipText}
      position="top"
    >
      <Image src={src} alt={altText} radius={radius} height="" width="" />
    </TooltipWrapper>
  )
}

export default WrappedImage
