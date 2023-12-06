import { FC, useCallback, useContext, useEffect, useMemo } from "react"
import useMeasure from "react-use-measure"
import { Image } from "@illa-design/react"
import { MediaSourceLoadContext } from "@/utils/mediaSourceLoad"
import { isValidUrlScheme } from "@/utils/typeHelper"
import {
  ImageWrapperStyle,
  imageWrapperContainerStyle,
} from "@/widgetLibrary/ImageWidget/style"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  DynamicHeight,
  ImageWidgetProps,
  ObjectFit,
  WrappedImageProps,
} from "./interface"

const getHeight = (
  dynamicHeight: DynamicHeight,
  aspectRatio: number,
  width: number,
  objectFit?: ObjectFit,
) => {
  if (dynamicHeight === "auto" && aspectRatio && aspectRatio > 0) {
    return `${width * aspectRatio}px`
  } else {
    return dynamicHeight === "fixed" || objectFit === "contain"
      ? "100%"
      : "auto"
  }
}

export const WrappedImage: FC<WrappedImageProps> = (props) => {
  const {
    imageSrc,
    altText,
    imageRadius,
    objectFit,
    aspectRatio = 1,
    dynamicHeight,
    handleOnClick,
    sourceLoadErrorHandle,
  } = props

  const [imageRef, imageBouds] = useMeasure()

  const width =
    dynamicHeight === "auto" || objectFit === "cover" ? "100%" : "auto"

  const height = getHeight(
    dynamicHeight,
    aspectRatio,
    imageBouds.width,
    objectFit,
  )

  const finalObjectFit =
    dynamicHeight === "auto"
      ? "cover"
      : dynamicHeight === "fixed" && objectFit === "contain"
        ? undefined
        : "cover"

  return (
    <Image
      ref={imageRef}
      src={imageSrc}
      radius={imageRadius}
      objectFit={finalObjectFit}
      alt={altText}
      width="100%"
      height="100%"
      css={imageWrapperContainerStyle(width, height)}
      draggable={false}
      onClick={handleOnClick}
      onError={() => {
        sourceLoadErrorHandle?.(imageSrc)
      }}
    />
  )
}

WrappedImage.displayName = "WrappedImage"

export const ImageWidget: FC<ImageWidgetProps> = (props) => {
  const {
    imageSrc,
    imageRadius,
    objectFit,
    horizontalAlign,
    dynamicHeight,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    tooltipText,
    triggerEventHandler,
    updateComponentHeight,
  } = props

  const { sourceLoadErrorHandler } = useContext(MediaSourceLoadContext)

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
    if (imageRadius && pattern.test(imageRadius)) {
      return imageRadius + "px"
    }
    return imageRadius
  }, [imageRadius])

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <AutoHeightContainer
        updateComponentHeight={updateComponentHeight}
        enable={enableAutoHeight}
      >
        <div css={ImageWrapperStyle(horizontalAlign)}>
          <WrappedImage
            {...props}
            imageSrc={finalSrc}
            imageRadius={finalRadius}
            objectFit={objectFit}
            dynamicHeight={dynamicHeight}
            handleOnClick={handleOnClick}
            sourceLoadErrorHandle={sourceLoadErrorHandler}
          />
        </div>
      </AutoHeightContainer>
    </TooltipWrapper>
  )
}
ImageWidget.displayName = "ImageWidget"
export default ImageWidget
