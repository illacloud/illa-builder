import { toPath } from "lodash"
import {
  FC,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { useSelector } from "react-redux"
import Slider from "react-slick"
import { Image } from "@illa-design/react"
import { ReactComponent as NextIcon } from "@/assets/carousel/next-shadow.svg"
import { ReactComponent as PreviousIcon } from "@/assets/carousel/prev-shadow.svg"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
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
import "./slick-carousel/slick-theme.css"
import "./slick-carousel/slick.css"

const PrevArrow: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  const { className, style, onClick } = props
  return <PreviousIcon className={className} style={style} onClick={onClick} />
}

const NextArrow: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  const { className, style, onClick } = props
  return <NextIcon className={className} style={style} onClick={onClick} />
}

export const Carousel = forwardRef<Slider, CarouselProps>((props, ref) => {
  const {
    onClickItem,
    showArrows,
    showDots,
    autoPlay,
    data,
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
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      lazyLoad={"anticipated"}
      afterChange={onChange}
    >
      {data.map((item, index) => {
        const { id, url, alt, hidden, disabled } = item
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
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
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
        const paths = ["manualData", `${index}`, "events"]
        triggerEventHandler(
          "click",
          convertPathToString(paths),
          undefined,
          (path) => {
            return convertPathToString(toPath(path).slice(3))
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
    updateComponentRuntimeProps({
      slickNext: () => {
        carouselRef.current?.slickNext()
      },
      slickPrevious: () => {
        carouselRef.current?.slickPrev()
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [displayName, updateComponentRuntimeProps, deleteComponentRuntimeProps])

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
export default CarouselWidget
