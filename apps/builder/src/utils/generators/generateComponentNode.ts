import { WidgetCardInfo } from "@/widgetLibrary/interface"
import { WidgetTypeList } from "@/widgetLibrary/widgetBuilder"
import {
  ComponentNode,
  CONTAINER_TYPE,
} from "@/redux/currentApp/editor/components/componentsState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const generateComponentNode = (
  widgetInfo: Partial<WidgetCardInfo>,
  parentNodeDisplayName?: string,
): ComponentNode => {
  let baseDSL: ComponentNode
  if (
    (!widgetInfo.type ||
      typeof widgetInfo.type !== "string" ||
      !WidgetTypeList.includes(widgetInfo.type)) &&
    widgetInfo.type !== "CANVAS"
  ) {
    throw new Error("Widget is not registered")
  }

  if (widgetInfo.w == undefined || widgetInfo.h == undefined) {
    throw new Error("dsl must have default width and height")
  }
  let childrenNodeDSL: ComponentNode[] = []
  const {
    defaults,
    w,
    h,
    type,
    displayName = "",
    containerType,
    x = -1,
    y = -1,
  } = widgetInfo
  let props: Record<string, any> | undefined = {}
  if (typeof defaults === "function") {
    props = defaults()
  } else {
    props = defaults
  }
  const realDisplayName = DisplayNameGenerator.generateDisplayName(
    type,
    displayName,
  )
  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    widgetInfo.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      const child = generateComponentNode(childNode, realDisplayName)
      childrenNodeDSL.push(child)
    })
  }

  baseDSL = {
    w,
    h,
    minH: 3,
    minW: 2,
    verticalResize: false,
    isDragging: true,
    isResizing: false,
    unitH: 0,
    unitW: 0,
    x,
    y,
    z: 0,
    showName: displayName,
    type,
    displayName: realDisplayName,
    containerType: containerType || CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: parentNodeDisplayName || null,
    childrenNode: childrenNodeDSL,
    props: props ?? {},
  }
  return baseDSL
}
