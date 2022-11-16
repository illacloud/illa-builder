import { useMemo, FC, useEffect, forwardRef } from "react"
import { Image } from "@illa-design/react"
import { isValidUrlScheme } from "@/utils/typeHelper"
import { ImageWidgetProps, WrappedImageProps } from "./interface"
import { ImageWrapperStyle } from "@/widgetLibrary/ImageWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedImage = forwardRef<HTMLImageElement, WrappedImageProps>(
  (props, ref) => {
    const { imageSrc, altText, radius, objectFit, handleOnClick } = props

    return (
      <Image
        ref={ref}
        src={imageSrc}
        objectFit={objectFit}
        alt={altText}
        radius={radius}
        height="100%"
        width="100%"
        css={ImageWrapperStyle}
        draggable={false}
        onClick={handleOnClick}
      />
    )
  },
)

WrappedImage.displayName = "WrappedImage"

export const ImageWidget: FC<ImageWidgetProps> = (props) => {
  const {
    imageSrc,
    altText,
    radius,
    objectFit,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleUpdateGlobalData,
    displayName,
    tooltipText,
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
  }, [
    displayName,
    imageSrc,
    altText,
    radius,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

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
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={ImageWrapperStyle}>
        <WrappedImage
          {...props}
          imageSrc={finalSrc}
          radius={finalRadius}
          objectFit={objectFit}
        />
      </div>
    </TooltipWrapper>
  )
}
ImageWidget.displayName = "ImageWidget"
