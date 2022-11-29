import { cloneDeep } from "lodash"
import { isObject } from "@illa-design/react"
import {
  CONTAINER_TYPE,
  ComponentNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { WidgetCardInfo } from "@/widgetLibrary/interface"
import { WidgetTypeList } from "@/widgetLibrary/widgetBuilder"

export const generateComponentNode = (
  widgetInfo: Partial<WidgetCardInfo>,
  parentNodeDisplayName?: string,
  pathToChildren: string[] = [],
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
    containerType = CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    x = -1,
    y = -1,
  } = widgetInfo
  let props: Record<string, any> | undefined = {}
  if (typeof defaults === "function") {
    props = cloneDeep(defaults())
  } else {
    props = cloneDeep(defaults)
  }
  const realDisplayName = DisplayNameGenerator.generateDisplayName(
    type,
    displayName,
  )

  if (isObject(props) && Object.hasOwn(props, "formDataKey")) {
    props.formDataKey = `{{${realDisplayName}.displayName}}`
  }

  if (
    isObject(props) &&
    Object.hasOwn(props, "events") &&
    Array.isArray(props.events)
  ) {
    props.events = props.events.map((event) => {
      return {
        ...event,
        widgetID: pathToChildren[pathToChildren.length - 1] || "unknown",
      }
    })
  }
  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    pathToChildren =
      containerType === CONTAINER_TYPE.EDITOR_SCALE_SQUARE
        ? [...pathToChildren, realDisplayName]
        : pathToChildren
    widgetInfo.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      const child = generateComponentNode(
        childNode,
        realDisplayName,
        pathToChildren,
      )
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
    containerType,
    parentNode: parentNodeDisplayName || null,
    childrenNode: childrenNodeDSL,
    props: props ?? {},
  }
  return baseDSL
}
