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
  let childrenNodeDSL: ComponentNode[] = []
  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    widgetInfo.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      const child = generateComponentNode(childNode)
      childrenNodeDSL.push(child)
    })
  }

  const { defaults, w, h, type, displayName = "" } = widgetInfo
  baseDSL = {
    w,
    h,
    minH: 5,
    minW: 2,
    verticalResize: false,
    isDragging: true,
    isResizing: false,
    unitH: 0,
    unitW: 0,
    x: -1,
    y: -1,
    z: 0,
    showName: displayName,
    type,
    displayName: DisplayNameGenerator.generateDisplayName(type, displayName),
    containerType: "EDITOR_SCALE_SQUARE",
    parentNode: null,
    childrenNode: childrenNodeDSL,
    props: defaults ?? {},
  }
  return baseDSL
}
