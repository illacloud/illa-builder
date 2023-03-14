import { get } from "lodash"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"

export const getRealShapeAndPosition = (
  componentNode: ComponentNode,
  unitH: number,
  unitW: number,
) => {
  const rootState = store.getState()
  const executionResult = getExecutionResult(rootState)
  const realProps: Record<string, any> = get(
    executionResult,
    componentNode.displayName,
    {},
  )
  const { $layoutInfo = {} } = realProps
  const {
    x: propsPositionX,
    y: propsPositionY,
    w: sharpeW,
    h: sharpeH,
  } = $layoutInfo
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
