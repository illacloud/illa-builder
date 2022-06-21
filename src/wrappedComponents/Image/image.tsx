import { Image } from "@illa-design/image"
import { useMemo, forwardRef, useImperativeHandle } from "react"
import { WrappedImageProps } from "./interface"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { isValidUrlScheme } from "@/utils/typeHelper"

export const WrappedImage = forwardRef<any, WrappedImageProps>((props, ref) => {
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
      handleUpdateDsl({ fallbackSrc: src })
    },
  }))

  const finalSrc = useMemo(() => {
    let finalURL = fallbackSrc
    if (finalURL && !isValidUrlScheme(finalURL)) {
      finalURL = `https://${finalURL}`
    }
    return finalURL
  }, [fallbackSrc])

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
        fallbackSrc={finalSrc}
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
