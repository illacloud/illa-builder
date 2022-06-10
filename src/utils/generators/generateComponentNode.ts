import { WidgetCardInfo } from "@/wrappedComponents/interface"
import { WidgetTypeList } from "@/wrappedComponents/WidgetBuilder"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

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

  if (!widgetInfo.displayName) {
    throw new Error("dsl must have displayName")
  }

  if (widgetInfo.w == undefined || widgetInfo.h == undefined) {
    throw new Error("dsl must have default width and height")
  }
  let childrenNodeDSL: ComponentNode[] = []
  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    widgetInfo.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      childrenNodeDSL.push(generateComponentNode(childNode))
    })
  }

  const { defaults, w, h, displayName, type } = widgetInfo
  baseDSL = {
    w,
    h,
    x: -1,
    y: -1,
    type,
    displayName,
    parentNode: null,
    // TODO weichen fix
    childrenNode: childrenNodeDSL.length > 0 ? childrenNodeDSL : null,
    props: defaults ?? {},
  }
  return baseDSL
}
