import { BaseDSL, WidgetCardInfo } from "@/wrappedComponents/interface"
import { WidgetTypeList } from "@/wrappedComponents/WidgetBuilder"

export const generateBaseDSL = (
  widgetInfo: Partial<WidgetCardInfo>,
): BaseDSL => {
  let baseDSL: BaseDSL
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

  if (!widgetInfo.w || !widgetInfo.h) {
    throw new Error("dsl must have default width and height")
  }
  let childrenNodeDSL: BaseDSL[] = []
  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    widgetInfo.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      childrenNodeDSL.push(generateBaseDSL(childNode))
    })
  }
  const { defaults, w, h, displayName, type } = widgetInfo
  baseDSL = {
    w,
    h,
    type,
    displayName,
    childrenNode: childrenNodeDSL.length > 0 ? childrenNodeDSL : undefined,
    props: defaults ?? {},
  }
  return baseDSL
}
