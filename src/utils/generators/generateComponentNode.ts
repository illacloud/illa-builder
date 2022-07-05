import { WidgetCardInfo } from "@/widgetLibrary/interface"
import { WidgetTypeList } from "@/widgetLibrary/widgetBuilder"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const generateComponentNode = (
  widgetInfo: Partial<WidgetCardInfo>,
): ComponentNode => {
  let baseDSL: ComponentNode
  if (
    !widgetInfo.type ||
    typeof widgetInfo.type !== "string" ||
    !WidgetTypeList.includes(widgetInfo.type)
  ) {
    throw new Error("Widget is not registered")
  }

  if (widgetInfo.w == undefined || widgetInfo.h == undefined) {
    throw new Error("dsl must have default width and height")
  }
  let childrenNodeDSL: {
    [key: string]: ComponentNode
  } = {}
  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    widgetInfo.childrenNode.map((childNode) => {
      const { displayName } = childNode
      if (!childrenNodeDSL) childrenNodeDSL = {}
      childrenNodeDSL[displayName] = generateComponentNode(childNode)
    })
  }

  const childrenNodeDSLKeys = Object.keys(childrenNodeDSL)

  const { defaults, w, h, type, displayName = "" } = widgetInfo
  baseDSL = {
    w,
    h,
    minH: 0,
    minW: 0,
    verticalResize: false,
    isDragging: true,
    error: false,
    x: -1,
    y: -1,
    z: 0,
    showName: displayName,
    type,
    displayName: DisplayNameGenerator.getDisplayName(type, displayName),
    containerType: "EDITOR_SCALE_SQUARE",
    parentNode: null,
    childrenNode: childrenNodeDSLKeys.length > 0 ? childrenNodeDSL : null,
    props: defaults ?? {},
  }
  return baseDSL
}
