import { FC, useCallback, useEffect } from "react"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { CarouselProps, CarouselWidgetProps } from "./interface"

export const Carousel: FC<CarouselProps> = (props) => {
  const { text, colorScheme, handleOnClick } = props

  return <div>carousel</div>
}

Carousel.displayName = "Carousel"

export const CarouselWidget: FC<CarouselWidgetProps> = (props) => {
  const {
    text,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    tooltipText,
    triggerEventHandler,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {})
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [text, handleUpdateGlobalData, displayName, handleDeleteGlobalData])

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={buttonLayoutStyle}>
        <Carousel {...props} handleOnClick={handleOnClick} />
      </div>
    </TooltipWrapper>
  )
}

CarouselWidget.displayName = "CarouselWidget"
