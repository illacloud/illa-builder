import { useMemo, FC, useEffect } from "react"
import { Image } from "@illa-design/image"
import { isValidUrlScheme } from "@/utils/typeHelper"
import { ImageWidgetProps, WrappedImageProps } from "./interface"
import { ImageWrapperStyle } from "@/widgetLibrary/ImageWidget/style"

export const WrappedImage: FC<WrappedImageProps> = (props) => {
  const { imageSrc, altText, radius } = props

  return (
    <Image
      fallbackSrc={imageSrc}
      alt={altText}
      radius={radius}
      height="100%"
      width="100%"
      css={ImageWrapperStyle}
    />
  )
}

WrappedImage.displayName = "ImageWidget"

export const ImageWidget: FC<ImageWidgetProps> = (props) => {
  const {
    imageSrc,
    altText,
    radius,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleUpdateGlobalData,
    displayName,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      imageSrc,
      altText,
      radius,
      setImageUrl: (url: string) => {
        handleUpdateDsl({ imageSrc: url })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, imageSrc, altText, radius])

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

  return <WrappedImage {...props} imageSrc={finalSrc} radius={finalRadius} />
}
