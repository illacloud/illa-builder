import { FC, forwardRef, useCallback, useEffect, useMemo } from "react"
import { Image } from "@illa-design/react"
import { isValidUrlScheme } from "@/utils/typeHelper"
import { ImageWrapperStyle } from "@/widgetLibrary/ImageWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { ImageWidgetProps, WrappedImageProps } from "./interface"

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
    radius,
    objectFit,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    tooltipText,
    triggerEventHandler,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setImageUrl: (url: string) => {
        handleUpdateDsl({ imageSrc: url })
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    handleUpdateDsl,
    updateComponentRuntimeProps,
  ])

  const finalSrc = useMemo(() => {
    let finalURL = imageSrc
    if (finalURL && !isValidUrlScheme(finalURL)) {
      if (!finalURL.startsWith("data:")) {
        finalURL = `https://${finalURL}`
      }
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

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={ImageWrapperStyle}>
        <WrappedImage
          {...props}
          imageSrc={finalSrc}
          radius={finalRadius}
          objectFit={objectFit}
          handleOnClick={handleOnClick}
        />
      </div>
    </TooltipWrapper>
  )
}
ImageWidget.displayName = "ImageWidget"
export default ImageWidget
