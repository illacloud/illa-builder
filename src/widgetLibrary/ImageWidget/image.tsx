import { useMemo, forwardRef, useImperativeHandle } from "react"
import { Image } from "@illa-design/image"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { isValidUrlScheme } from "@/utils/typeHelper"
import { WrappedImageProps } from "./interface"

export const WrappedImage = forwardRef<any, WrappedImageProps>((props, ref) => {
  const {
    imageSrc,
    altText,
    tooltipText,
    width,
    height,
    radius,
    handleUpdateDsl,
  } = props

  useImperativeHandle(ref, () => ({
    setImageUrl: (src: string) => {
      handleUpdateDsl({ imageSrc: src })
    },
  }))

  const finalSrc = useMemo(() => {
    let finalURL = imageSrc
    if (finalURL && !isValidUrlScheme(finalURL)) {
      finalURL = `https://${finalURL}`
    }
    return finalURL
  }, [imageSrc])

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
        alt={altText}
        radius={finalRadius}
        height={height}
        width={width}
      />
    </TooltipWrapper>
  )
})

WrappedImage.displayName = "ImageWidget"

export const ImageWidget = WrappedImage
