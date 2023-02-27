import { FC, useCallback, useEffect, useMemo } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { PreviousIcon } from "@illa-design/react"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import { sliderStyle } from "@/widgetLibrary/CarouselWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { CarouselProps, CarouselWidgetProps } from "./interface"

export const Carousel: FC<CarouselProps> = (props) => {
  const { handleOnClick, showArrows, showDots, autoPlay, data } = props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider
      css={sliderStyle}
      // dotsClass={"illa-carousel-dots"}
      dots={showDots}
      arrows={showArrows}
      autoplay={autoPlay}
      prevArrow={<PreviousIcon />}
    >
      {data.map((item) => {
        const { id, value, url, alt, hidden } = item
        if (hidden) return null
        return (
          <div key={id}>
            <img src={url} alt={alt} />
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
    manualData,
    mappedData,
    configureMode,
  } = props

  const data = useMemo(() => {
    console.log({ manualData, mappedData, configureMode })
    if (configureMode === "static") {
      return manualData
    }
    return mappedData
  }, [manualData, mappedData, configureMode])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {})
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [handleUpdateGlobalData, displayName, handleDeleteGlobalData])

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={buttonLayoutStyle}>
        <Carousel data={data ?? []} handleOnClick={handleOnClick} />
      </div>
    </TooltipWrapper>
  )
}

CarouselWidget.displayName = "CarouselWidget"
