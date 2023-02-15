import { FC, useEffect } from "react"
import { useMeasure } from "react-use"
import { IconWidgetProps } from "@/widgetLibrary/IconWidget/interface"
import { getIconContainerStyle } from "@/widgetLibrary/IconWidget/style"
import { AllData } from "@/widgetLibrary/IconWidget/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const IconWidget: FC<IconWidgetProps> = (props) => {
  const {
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
    iconName,
    displayName,
  } = props

  const [containerRef, containerBounds] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      tooltipText,
      iconName,
      displayName,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
    iconName,
    displayName,
  ])

  const getIcon = (iconName && AllData[iconName]) || null

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div
        ref={containerRef}
        css={getIconContainerStyle(
          containerBounds.width > containerBounds.height,
        )}
      >
        {getIcon && getIcon({})}
      </div>
    </TooltipWrapper>
  )
}

IconWidget.displayName = "IconWidget"
