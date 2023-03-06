import { FC, forwardRef, useCallback, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { Image } from "@illa-design/react"
import { ReactComponent as NextIcon } from "@/assets/carousel/next-shadow.svg"
import { ReactComponent as PreviousIcon } from "@/assets/carousel/prev-shadow.svg"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import {
  applyDisabledStyle,
  fullHeightStyle,
  fullImageStyle,
  sliderStyle,
} from "@/widgetLibrary/CarouselWidget/style"
import { formatData } from "@/widgetLibrary/CarouselWidget/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { CarouselProps, CarouselWidgetProps } from "./interface"

export const Carousel = forwardRef<Slider, CarouselProps>((props, ref) => {
  const {
    onClickItem,
    showArrows,
    showDots,
    autoPlay,
    data,
    disabled,
    interval,
    draggable,
    radius,
    onChange,
  } = props

  return (
    <Slider
      ref={ref}
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
      afterChange={onChange}
    >
      {data.map((item, index) => {
        const { id, label, url, alt, hidden, disabled } = item
        if (hidden) return null
        return (
          <div
            css={[fullHeightStyle, applyDisabledStyle(disabled)]}
            key={id}
            onClick={() => {
              !disabled && onClickItem?.(index)
            }}
          >
            <Image
              src={url}
              objectFit={"cover"}
              alt={alt}
              radius={radius}
              height="100%"
              width="100%"
              css={fullImageStyle}
            />
          </div>
        )
      })}
    </Slider>
  )
})

Carousel.displayName = "Carousel"

export const CarouselWidget: FC<CarouselWidgetProps> = (props) => {
  const {
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    triggerMappedEventHandler,
    displayName,
    tooltipText,
    manualData,
    mappedData,
    configureMode,
    showArrows,
    showDots,
    autoPlay,
    interval,
    radius,
  } = props
  const carouselRef = useRef<Slider>(null)
  const isEditMode = useSelector(getIsILLAEditMode) ?? true

  const finalRadius = useMemo(() => {
    const reg = /^\d+$/
    const pattern = new RegExp(reg)
    if (radius && pattern.test(radius)) {
      return radius + "px"
    }
    return radius
  }, [radius])

  const data = useMemo(() => {
    if (configureMode === "static") {
      return manualData
    }

    return mappedData ? formatData(mappedData) : []
  }, [manualData, mappedData, configureMode])

  const handleOnClickItem = useCallback(
    (index: number) => {
      if (configureMode === "static") {
        triggerEventHandler(
          "click",
          `manualData.${index}.events`,
          undefined,
          (path) => {
            return path.split(".").slice(3).join(".")
          },
        )
      } else {
        triggerMappedEventHandler("click", `mappedData.events`, index)
      }
    },
    [configureMode, triggerEventHandler, triggerMappedEventHandler],
  )

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  const handleOnChange = useCallback(
    (index: number) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: { current: index },
        },
      ])
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      slickNext: () => {
        carouselRef.current?.slickNext()
      },
      slickPrevious: () => {
        carouselRef.current?.slickPrev()
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, handleUpdateGlobalData, handleDeleteGlobalData])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={buttonLayoutStyle}>
        <Carousel
          ref={carouselRef}
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
          onChange={handleOnChange}
          radius={finalRadius}
        />
      </div>
    </TooltipWrapper>
  )
}

CarouselWidget.displayName = "CarouselWidget"
