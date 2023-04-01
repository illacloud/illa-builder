import { get } from "lodash"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionWidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"

export const getRealShapeAndPosition = (
  componentNode: ComponentNode,
  unitH: number,
  unitW: number,
) => {
  const rootState = store.getState()
  const executionResult = getExecutionWidgetLayoutInfo(rootState)
  const widgetLayoutInfo = get(
    executionResult,
    componentNode.displayName,
    undefined,
  )
  if (!widgetLayoutInfo)
    return {
      x: -1,
      y: -1,
      w: -1,
      h: -1,
    }
  const layoutInfo = widgetLayoutInfo.layoutInfo
  const {
    x: propsPositionX,
    y: propsPositionY,
    w: sharpeW,
    h: sharpeH,
  } = layoutInfo
  const x = (propsPositionX || componentNode.x) * (unitW || componentNode.unitW)
  const y = (propsPositionY || componentNode.y) * (unitH || componentNode.unitH)
  const w = (sharpeW || componentNode.w) * (unitW || componentNode.unitW)
  const h = (sharpeH || componentNode.h) * (unitH || componentNode.unitH)
  return {
    x,
    y,
    w,
    h,
  }
}
