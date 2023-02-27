import { FC, useCallback, useEffect, useMemo } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { PreviousIcon } from "@illa-design/react"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import { sliderStyle } from "@/widgetLibrary/CarouselWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  CarouselProps,
  CarouselSettings,
  CarouselWidgetProps,
} from "./interface"

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

  const formatOptions = (
    optionConfigureMode: "dynamic" | "static" = "static",
    manualOptions: CarouselSettings[] = [],
    mappedOption: {
      id: string[]
      values: string[]
      url: string[]
      alt?: string[]
      hiddens?: boolean[]
    },
  ) => {
    if (optionConfigureMode === "dynamic") {
      const url = mappedOption.url ?? []
      const value = mappedOption.values ?? []
      const disabled = mappedOption.hiddens ?? []
      const maxLength = Math.max(url.length, value.length, disabled.length)
      const options: {
        url: string
        value: string
        disabled?: boolean
      }[] = []
      for (let i = 0; i < maxLength; i++) {
        let urlItem = url[i] || value[i]
        const valueItem = value[i] || url[i] || i.toString()
        const disabledItem = disabled[i]

        options.push({
          url: urlItem,
          value: valueItem,
          disabled: disabledItem,
        })
      }
      return options
    } else {
      if (!Array.isArray(manualOptions)) {
        return []
      }
      const options: {
        url: string | number
        value: string | number
        disabled?: boolean
      }[] = []
      manualOptions.forEach((option, index) => {
        let labelItem = option.url || option.value || index
        const valueItem = option.value || labelItem || index
        const hiddenItem = option.hidden
        if (typeof labelItem === "object") {
          labelItem = index
        }
        options.push({
          url: labelItem,
          value: valueItem,
          hidden: hiddenItem,
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
        <Carousel data={data ?? []} handleOnClick={handleOnClick} />
      </div>
    </TooltipWrapper>
  )
}

CarouselWidget.displayName = "CarouselWidget"
