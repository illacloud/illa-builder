import { ComponentTreeNode } from "@illa-public/public-types"
import { get } from "lodash-es"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import store from "@/store"

export const getRealShapeAndPosition = (
  componentNode: ComponentTreeNode,
  unitW: number,
  displayNamePrefix?: string,
) => {
  const rootState = store.getState()
  const executionResult = getClientWidgetLayoutInfo(rootState)
  let realDisplayName = componentNode.displayName
  if (displayNamePrefix) {
    realDisplayName = realDisplayName.replace(displayNamePrefix, "")
  }
  const widgetLayoutInfo = get(executionResult, realDisplayName, undefined)
  if (!widgetLayoutInfo) {
    return {
      x: -1,
      y: -1,
      w: -1,
      h: -1,
    }
  }
  const layoutInfo = widgetLayoutInfo.layoutInfo
  const {
    x: propsPositionX,
    y: propsPositionY,
    w: sharpeW,
    h: sharpeH,
  } = layoutInfo
  const x = (propsPositionX || componentNode.x) * unitW
  const y = (propsPositionY || componentNode.y) * UNIT_HEIGHT
  const w = (sharpeW || componentNode.w) * unitW
  const h = (sharpeH || componentNode.h) * UNIT_HEIGHT
  return {
    x,
    y,
    w,
    h,
  }
}

export const useGetRealShapeAndPosition = (
  displayName: string,
  unitW: number,
  displayNamePrefix?: string,
) => {
  const layoutInfos = useSelector(getClientWidgetLayoutInfo)

  const result = useMemo(() => {
    let realDisplayName = displayName
    if (displayNamePrefix) {
      realDisplayName = realDisplayName.replace(displayNamePrefix, "")
    }
    const widgetLayoutInfo = get(layoutInfos, realDisplayName, undefined)
    if (!widgetLayoutInfo) {
      return {
        left: -1,
        top: -1,
        width: -1,
        height: -1,
      }
    }
    const layoutInfo = widgetLayoutInfo.layoutInfo
    const {
      x: propsPositionX,
      y: propsPositionY,
      w: sharpeW,
      h: sharpeH,
    } = layoutInfo
    return {
      left: propsPositionX * unitW,
      top: propsPositionY * UNIT_HEIGHT,
      width: sharpeW * unitW,
      height: sharpeH * UNIT_HEIGHT,
    }
  }, [displayName, displayNamePrefix, layoutInfos, unitW])

  return result
}
