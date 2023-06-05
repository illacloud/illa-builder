import { FC, useMemo, useRef } from "react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { JSONViewer } from "@/widgetLibrary/JsonViewerWidget/baseJsonViewer"
import { JsonViewerWidgetProps } from "@/widgetLibrary/JsonViewerWidget/interface"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const JsonViewerWidget: FC<JsonViewerWidgetProps> = (props) => {
  const {
    value,
    tooltipText,
    dynamicHeight,
    h,
    expandAll,
    dynamicMinHeight,
    dynamicMaxHeight,
    updateComponentHeight,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return h * UNIT_HEIGHT >= (dynamicMinHeight ?? h * UNIT_HEIGHT)
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight, dynamicMinHeight, h])

  const dynamicOptions = {
    dynamicMinHeight,
    dynamicMaxHeight,
  }

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={enableAutoHeight}
      dynamicOptions={dynamicOptions}
    >
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <JSONViewer value={value} ref={containerRef} expandAll={expandAll} />
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

JsonViewerWidget.displayName = "JsonViewerWidget"
