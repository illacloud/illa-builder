import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import { combineWidgetInfos } from "./getDragShadow"

export interface DropResult {
  widgetLeft: number
  widgetTop: number
  widgetWidth: number
  widgetHeight: number
  displayName: string
}

export const getLayoutInfosWithRelativeCombineShape = (
  widgetLayoutInfos: WidgetLayoutInfo[],
) => {
  const combineShape = combineWidgetInfos(widgetLayoutInfos)

  return widgetLayoutInfos.map((info) => {
    return {
      ...info,
      layoutInfo: {
        ...info.layoutInfo,
        x: info.layoutInfo.x - combineShape.x,
        y: info.layoutInfo.y - combineShape.y,
      },
    }
  })
}
