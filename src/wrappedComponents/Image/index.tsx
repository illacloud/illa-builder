import { Image } from "@illa-design/image"
import { FC } from "react"
import { WrappedImageProps } from "./interface"
import { Tooltip } from "@illa-design/tooltip"

const WrappedImage: FC<WrappedImageProps> = (props) => {
  const { src, altText, radius, tooltipText } = props
  return (
    <Tooltip
      content={tooltipText}
      disabled={!tooltipText}
      position="top"
      showArrow={false}
      autoFitPosition={false}
    >
      <Image src={src} alt={altText} radius={radius} height="" width="" />
    </Tooltip>
  )
}

export default WrappedImage
