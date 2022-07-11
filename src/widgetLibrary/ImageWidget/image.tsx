import { useMemo, FC, useImperativeHandle, useEffect } from "react"
import { Image } from "@illa-design/image"
import { isValidUrlScheme } from "@/utils/typeHelper"
import { WrappedImageProps } from "./interface"
import { ImageWrapperStyle } from "@/widgetLibrary/ImageWidget/style"

export const WrappedImage: FC<WrappedImageProps> = (props, ref) => {
  const {
    imageSrc,
    altText,
    radius,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleUpdateGlobalData,
    displayName,
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

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      imageSrc,
      altText,
      radius,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, imageSrc, altText, radius])

  return (
    <Image
      fallbackSrc={finalSrc}
      alt={altText}
      radius={finalRadius}
      height="100%"
      width="100%"
      css={ImageWrapperStyle}
    />
  )
}

WrappedImage.displayName = "ImageWidget"

export const ImageWidget = WrappedImage
