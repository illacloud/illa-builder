import { cloneDeep, get, set } from "lodash"
import { isObject } from "@illa-design/react"
import { buildInitDragInfo } from "@/page/App/components/ComponentPanel/componentListBuilder"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import {
  CONTAINER_TYPE,
  ComponentNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { WidgetType, widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const generateWidgetLayoutInfo = (
  type: string,
  baseDisplayName: string,
  containerType: CONTAINER_TYPE = CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
): WidgetLayoutInfo | undefined => {
  const realDisplayName = DisplayNameGenerator.generateDisplayName(
    type,
    baseDisplayName,
  )
  const currentComponentConfig = buildInitDragInfo(type)
  if (currentComponentConfig === undefined) {
    return undefined
  }

  return {
    displayName: realDisplayName,
    widgetType: type,
    layoutInfo: {
      w: currentComponentConfig.w,
      h: currentComponentConfig.h,
      x: currentComponentConfig.x ?? 0,
      y: currentComponentConfig.y ?? 0,
      z: 0,
      minW: DEFAULT_MIN_COLUMN,
      minH: currentComponentConfig.minH ?? 3,
    },
    containerType,
    parentNode: "",
    childrenNode: [] as string[],
  }
}

export const generateComponentNodeByWidgetInfo = (
  displayName: string,
  widgetInfo: Omit<WidgetConfig, "icon" | "sessionType" | "keywords">,
  parentNodeDisplayName: string,
  pathToChildren: string[] = [],
) => {
  let baseDSL: ComponentNode
  let childrenNodeDSL: ComponentNode[] = []
  const {
    defaults,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    minW = DEFAULT_MIN_COLUMN,
    minH = 3,
    type,
    displayName: showName,
    containerType = CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    version,
  } = widgetInfo
  let props: Record<string, any> | undefined = {}
  if (typeof defaults === "function") {
    props = cloneDeep(defaults())
  } else {
    props = cloneDeep(defaults)
  }
  if (isObject(props) && props.hasOwnProperty("formDataKey")) {
    props.formDataKey = `{{${displayName}.displayName}}`
  }

  if (
    isObject(props) &&
    props.hasOwnProperty("events") &&
    Array.isArray(props.events)
  ) {
    props.events = props.events.map((event) => {
      if (event.actionType !== "widget") {
        return event
      } else {
        return {
          ...event,
          widgetID: pathToChildren[pathToChildren.length - 1] || "unknown",
        }
      }
    })
  }

  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    pathToChildren =
      containerType === CONTAINER_TYPE.EDITOR_SCALE_SQUARE
        ? [...pathToChildren, displayName]
        : pathToChildren
    widgetInfo.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      const child = newGenerateChildrenComponentNode(
        childNode,
        displayName,
        pathToChildren,
      )
      childrenNodeDSL.push(child)
    })
  }

  baseDSL = {
    w,
    h,
    minW,
    minH,
    x,
    y,
    z: 0,
    showName: showName,
    type,
    displayName: displayName,
    containerType,
    parentNode: parentNodeDisplayName,
    childrenNode: childrenNodeDSL,
    version,
    props: props ?? {},
  }
  if (baseDSL.type === "LIST_WIDGET") {
    baseDSL = transformListWidget(baseDSL)
  }
  return baseDSL
}

export const newGenerateChildrenComponentNode = (
  widgetInfo: Omit<WidgetConfig, "icon" | "sessionType" | "keywords">,
  parentNodeDisplayName: string,
  pathToChildren: string[] = [],
): ComponentNode => {
  if (widgetInfo.type === "CANVAS") {
    const realDisplayName = DisplayNameGenerator.generateDisplayName(
      widgetInfo.type,
      widgetInfo.displayName,
    )
    let childrenNodeDSL: ComponentNode[] = []
    if (
      Array.isArray(widgetInfo.childrenNode) &&
      widgetInfo.childrenNode.length > 0
    ) {
      widgetInfo.childrenNode.map((childNode) => {
        if (!childrenNodeDSL) childrenNodeDSL = []
        const child = newGenerateChildrenComponentNode(
          childNode,
          realDisplayName,
          pathToChildren,
        )
        childrenNodeDSL.push(child)
      })
    }
    return {
      w: widgetInfo.w,
      h: widgetInfo.h,
      minW: DEFAULT_MIN_COLUMN,
      minH: widgetInfo.minH as number,
      x: -1,
      y: -1,
      z: 0,
      showName: widgetInfo.displayName,
      type: widgetInfo.type,
      containerType: widgetInfo.containerType as CONTAINER_TYPE,
      parentNode: parentNodeDisplayName,
      childrenNode: childrenNodeDSL,
      displayName: realDisplayName,
      props: {},
      version: widgetInfo.version,
    }
  }
  const layoutInfo = generateWidgetLayoutInfo(
    widgetInfo.type,
    widgetInfo.displayName,
    widgetInfo.containerType,
  )

  return generateComponentNodeByWidgetInfo(
    layoutInfo?.displayName!,
    widgetInfo,
    parentNodeDisplayName,
    pathToChildren,
  )
}

export const newGenerateComponentNode = (
  x: number,
  y: number,
  defaultW: number,
  widgetType: WidgetType,
  displayName: string,
  parentNodeDisplayName: string,
  pathToChildren: string[] = [],
) => {
  let baseDSL: ComponentNode
  const baseConfig = widgetBuilder(widgetType).config
  let childrenNodeDSL: ComponentNode[] = []
  const {
    defaults,
    w,
    h,
    minW = DEFAULT_MIN_COLUMN,
    minH = 3,
    type,
    displayName: showName,
    containerType = CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    version,
  } = baseConfig
  let props: Record<string, any> | undefined = {}
  if (typeof defaults === "function") {
    props = cloneDeep(defaults())
  } else {
    props = cloneDeep(defaults)
  }
  if (isObject(props) && Object.hasOwn(props, "formDataKey")) {
    props.formDataKey = `{{${displayName}.displayName}}`
  }

  if (
    isObject(props) &&
    props.hasOwnProperty("events") &&
    Array.isArray(props.events)
  ) {
    props.events = props.events.map((event) => {
      if (event.actionType !== "widget") {
        return event
      } else {
        return {
          ...event,
          widgetID: pathToChildren[pathToChildren.length - 1] || "unknown",
        }
      }
    })
  }

  if (baseConfig.childrenNode && Array.isArray(baseConfig.childrenNode)) {
    pathToChildren =
      containerType === CONTAINER_TYPE.EDITOR_SCALE_SQUARE
        ? [...pathToChildren, displayName]
        : pathToChildren
    baseConfig.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      const child = newGenerateChildrenComponentNode(
        childNode,
        displayName,
        pathToChildren,
      )
      childrenNodeDSL.push(child)
    })
  }

  baseDSL = {
    w: type === "MODAL_WIDGET" ? w : defaultW,
    h,
    minW,
    minH,
    x,
    y,
    z: 0,
    showName: showName,
    type,
    displayName: displayName,
    containerType,
    parentNode: parentNodeDisplayName,
    childrenNode: childrenNodeDSL,
    props: props ?? {},
    version,
  }
  if (baseDSL.type === "LIST_WIDGET") {
    baseDSL = transformListWidget(baseDSL)
  }
  return baseDSL
}

function transformListWidget(baseDSL: ComponentNode) {
  const container = baseDSL.childrenNode[0]
  let templateChildren = container.childrenNode
  templateChildren.map((node) => {
    const props = node.props
    if (props && Array.isArray(props.$dynamicAttrPaths)) {
      props.$dynamicAttrPaths.forEach((path) => {
        const originValue = get(node, `props.${path}`, "")
        const finalValue = originValue.replace(
          "templateDisplayName",
          baseDSL.displayName,
        )
        set(node, `props.${path}`, finalValue)
      })
    }
    return node
  })
  return baseDSL
}
