import { ComponentTreeNode } from "@illa-public/public-types"
import { CONTAINER_TYPE } from "@illa-public/public-types"
import { klona } from "klona"
import { get, set } from "lodash-es"
import { isObject } from "@illa-design/react"
import { buildInitDragInfo } from "@/page/App/components/ComponentPanel/componentListBuilder"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { WidgetType, widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const TEMPLATE_DISPLAYNAME_KEY = "templateDisplayName"

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
  scale: number = 1,
) => {
  let baseDSL: ComponentTreeNode
  let childrenNodeDSL: ComponentTreeNode[] = []
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
    props = klona(defaults())
  } else {
    props = klona(defaults)
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
        scale,
      )
      childrenNodeDSL.push(child)
    })
  }

  baseDSL = {
    w: Math.floor(w * scale),
    h,
    minW,
    minH,
    x: Math.floor(x * scale),
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
  if (baseDSL.type === "LIST_WIDGET" || baseDSL.type === "GRID_LIST_WIDGET") {
    baseDSL = transformListWidget(baseDSL)
  }
  return baseDSL
}

export const newGenerateChildrenComponentNode = (
  widgetInfo: Omit<WidgetConfig, "icon" | "sessionType" | "keywords">,
  parentNodeDisplayName: string,
  pathToChildren: string[] = [],
  scale: number = 1,
): ComponentTreeNode => {
  if (widgetInfo.type === "CANVAS") {
    const realDisplayName = DisplayNameGenerator.generateDisplayName(
      widgetInfo.type,
      widgetInfo.displayName,
    )
    let childrenNodeDSL: ComponentTreeNode[] = []
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
          scale,
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
    scale,
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
  scale: number = 1,
) => {
  let baseDSL: ComponentTreeNode
  const baseConfig = widgetBuilder(widgetType).config
  let childrenNodeDSL: ComponentTreeNode[] = []
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
    props = klona(defaults())
  } else {
    props = klona(defaults)
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
        scale,
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
  if (baseDSL.type === "LIST_WIDGET" || baseDSL.type === "GRID_LIST_WIDGET") {
    baseDSL = transformListWidget(baseDSL)
  } else {
    baseDSL = transFormTemplateDisplayName(baseDSL)
  }
  return baseDSL
}

function transformListWidget(baseDSL: ComponentTreeNode) {
  const container = baseDSL.childrenNode[0]
  let templateChildren = container.childrenNode
  templateChildren.map((node) => {
    return transFormTemplateDisplayName(node, baseDSL.displayName)
  })
  return baseDSL
}

function transFormTemplateDisplayName(
  baseDSL: ComponentTreeNode,
  targetDisplayName: string = baseDSL.displayName,
) {
  const props = baseDSL.props
  if (props && Array.isArray(props.$dynamicAttrPaths)) {
    props.$dynamicAttrPaths.forEach((path) => {
      const originValue = get(baseDSL, `props.${path}`, "")
      const finalValue = originValue.replace(
        TEMPLATE_DISPLAYNAME_KEY,
        targetDisplayName,
      )
      set(baseDSL, `props.${path}`, finalValue)
    })
  }
  return baseDSL
}
