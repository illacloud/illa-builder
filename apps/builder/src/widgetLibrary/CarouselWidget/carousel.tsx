import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { NextIcon, PreviousIcon } from "@illa-design/react"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import {
  fullHeightStyle,
  fullImageStyle,
  sliderStyle,
} from "@/widgetLibrary/CarouselWidget/style"
import { formatData } from "@/widgetLibrary/CarouselWidget/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { CarouselProps, CarouselWidgetProps } from "./interface"

export const Carousel: FC<CarouselProps> = (props) => {
  const {
    onClickItem,
    showArrows,
    showDots,
    autoPlay,
    data,
    disabled,
    interval,
    draggable,
  } = props

  return (
    <Slider
      centerMode
      centerPadding={"0px"}
      css={sliderStyle}
      // edit mode need to disable slider drag event
      draggable={draggable}
      touchMove={draggable}
      dots={showDots}
      arrows={showArrows}
      autoplay={autoPlay}
      autoplaySpeed={interval}
      prevArrow={<PreviousIcon />}
      nextArrow={<NextIcon />}
      lazyLoad={"anticipated"}
    >
      {data.map((item, index) => {
        const { id, label, url, alt, hidden, disabled } = item
        if (hidden) return null
        return (
          <div
            css={fullHeightStyle}
            key={id}
            onClick={() => {
              !disabled && onClickItem?.(index)
            }}
          >
            <img css={fullImageStyle} src={url} alt={alt} />
          </div>
        )
      })}
    </Slider>
  )
}

Carousel.displayName = "Carousel"

export const CarouselWidget: FC<CarouselWidgetProps> = (props) => {
  const {
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    tooltipText,
    triggerEventHandler,
    triggerMappedEventHandler,
    manualData,
    mappedData,
    configureMode,
    showArrows,
    showDots,
    autoPlay,
    interval,
  } = props
  const isEditMode = useSelector(getIsILLAEditMode) ?? true

  const data = useMemo(() => {
    if (configureMode === "static") {
      return manualData
    }

    return mappedData ? formatData(mappedData) : []
  }, [manualData, mappedData, configureMode])

  const handleOnClickItem = useCallback(
    (index: number) => {
      if (configureMode === "static") {
        triggerEventHandler("click", `manualData.${index}.events`)
      } else {
        triggerMappedEventHandler("click", `mappedData.events`, index)
      }
    },
    [configureMode, triggerEventHandler, triggerMappedEventHandler],
  )

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={buttonLayoutStyle}>
        <Carousel
          // autoPlay change need to reload Carousel
          draggable={!isEditMode}
          key={Number(autoPlay)}
          data={data ?? []}
          handleOnClick={handleOnClick}
          showArrows={showArrows}
          showDots={showDots}
          autoPlay={autoPlay}
          interval={interval}
          onClickItem={handleOnClickItem}
        />
      </div>
    </TooltipWrapper>
  )
}

CarouselWidget.displayName = "CarouselWidget"
