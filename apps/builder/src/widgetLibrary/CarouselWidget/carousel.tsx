import { FC, useCallback, useEffect, useMemo } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { Loading, NextIcon, PreviousIcon } from "@illa-design/react"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import {
  dotStyle,
  fullHeightStyle,
  fullImageStyle,
  sliderStyle,
} from "@/widgetLibrary/CarouselWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  CarouselProps,
  CarouselSettings,
  CarouselWidgetProps,
  MappedCarouselData,
} from "./interface"

export const Carousel: FC<CarouselProps> = (props) => {
  const {
    handleOnClick,
    showArrows,
    showDots,
    autoPlay,
    data,
    disabled,
    interval,
  } = props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider
      centerMode
      centerPadding={"0px"}
      css={sliderStyle}
      draggable={false}
      dots={showDots}
      arrows={showArrows}
      autoplay={autoPlay}
      autoplaySpeed={interval}
      prevArrow={<PreviousIcon />}
      nextArrow={<NextIcon />}
      lazyLoad={"anticipated"}
    >
      {data.map((item, index) => {
        const { id, label, url, alt, hidden } = item
        if (hidden) return null
        return (
          <div css={fullHeightStyle} key={id}>
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
    manualData,
    mappedData,
    configureMode,
    showArrows,
    showDots,
    autoPlay,
    interval,
  } = props

  const formatOptions = (
    optionConfigureMode: "dynamic" | "static" = "static",
    manualOptions: CarouselSettings[] = [],
    mappedOption: MappedCarouselData,
  ) => {
    if (optionConfigureMode === "dynamic") {
      const id = mappedOption.ids ?? []
      const url = mappedOption.urls ?? []
      const label = mappedOption.label ?? []
      const hidden = mappedOption.isHidden ?? []
      const maxLength = Math.max(
        id.length,
        url.length,
        label.length,
        hidden.length,
      )
      const options: CarouselSettings[] = []
      for (let i = 0; i < maxLength; i++) {
        options.push({
          id: id[i],
          url: url[i],
          label: label[i],
          hidden: hidden[i],
        })
      }
      return options
    } else {
      if (!Array.isArray(manualOptions)) {
        return []
      }
      const options: CarouselSettings[] = []
      manualOptions.forEach((option, index) => {
        options.push({
          id: option.id,
          url: option.url,
          label: option.label,
          hidden: option.hidden,
        })
      })
      return options
    }
  }

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
        <Carousel
          // autoPlay change need to reload Carousel
          key={Number(autoPlay)}
          data={data ?? []}
          handleOnClick={handleOnClick}
          showArrows={showArrows}
          showDots={showDots}
          autoPlay={autoPlay}
          interval={interval}
        />
      </div>
    </TooltipWrapper>
  )
}

CarouselWidget.displayName = "CarouselWidget"
