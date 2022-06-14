import { Image } from "@illa-design/image"
import { FC, useMemo, forwardRef, useImperativeHandle } from "react"
import { WrappedImageProps } from "./interface"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"

export const WrappedImage: FC<WrappedImageProps> = forwardRef((props, ref) => {
  const {
    fallbackSrc,
    alt,
    radius,
    tooltipText,
    width,
    height,
    handleUpdateDsl,
  } = props

  useImperativeHandle(ref, () => ({
    setImageUrl: (src: string) => {
      handleUpdateDsl({ src })
    },
  }))

  const finalRadius = useMemo(() => {
    const reg = /^\d+$/
    const pattern = new RegExp(reg)
    if (radius && pattern.test(radius)) {
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
        fallbackSrc={fallbackSrc}
        alt={alt}
        radius={finalRadius}
        height={height}
        width={width}
      />
    </TooltipWrapper>
  )
})

WrappedImage.displayName = "ImageWidget"

export const ImageWidget = WrappedImage
