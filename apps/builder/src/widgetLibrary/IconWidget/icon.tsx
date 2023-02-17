import { FC, useCallback, useEffect } from "react"
import { useMeasure } from "react-use"
import { IconWidgetProps } from "@/widgetLibrary/IconWidget/interface"
import { getIconContainerStyle } from "@/widgetLibrary/IconWidget/style"
import { AllData } from "@/widgetLibrary/IconWidget/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const IconWidget: FC<IconWidgetProps> = (props) => {
  const {
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
    iconName,
    colorScheme,
    displayName,
    triggerEventHandler,
  } = props

  const [containerRef, containerBounds] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      tooltipText,
      iconName,
      colorScheme,
      displayName,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
    iconName,
    colorScheme,
    displayName,
  ])

  const getIcon = (iconName && AllData[iconName]) || null

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div
        ref={containerRef}
        css={getIconContainerStyle(
          containerBounds.width > containerBounds.height,
          colorScheme,
        )}
      >
        <div onClick={handleOnClick}>{getIcon && getIcon({})}</div>
      </div>
    </TooltipWrapper>
  )
}

IconWidget.displayName = "IconWidget"
