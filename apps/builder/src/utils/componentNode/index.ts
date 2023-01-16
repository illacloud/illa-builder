import { cloneDeep, get, set } from "lodash"
import {
  getAllPaths,
  getWidgetOrActionDynamicAttrPaths,
  isDynamicString,
  isPathInDynamicAttrPaths,
} from "@/utils/evaluateDynamicString/utils"
import { isObject } from "@/utils/typeHelper"

enum DynamicAttrPathActions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  NONE = "NONE",
}

interface DynamicAttrPathUpdateShape {
  attrPath: string
  action: DynamicAttrPathActions
}

const getDynamicAttrPathUpdate = (
  widgetProps: Record<string, any>,
  attrPath: string,
  attrValue: any,
): DynamicAttrPathUpdateShape => {
  let stringValue = attrValue
  if (isObject(attrValue)) {
    stringValue = JSON.stringify(attrValue)
  }
  const isDynamic = isDynamicString(stringValue)
  const isPathInDynamic = isPathInDynamicAttrPaths(widgetProps, attrPath)
  if (!isDynamic && isPathInDynamic) {
    return {
      attrPath,
      action: DynamicAttrPathActions.REMOVE,
    }
  } else if (isDynamic && !isPathInDynamic) {
    return {
      attrPath,
      action: DynamicAttrPathActions.ADD,
    }
  }
  return {
    attrPath,
    action: DynamicAttrPathActions.NONE,
  }
}

const generateDynamicAttrPaths = (
  current: string[],
  update: DynamicAttrPathUpdateShape,
): string[] => {
  if (update.action === DynamicAttrPathActions.ADD) {
    current.push(update.attrPath)
  } else if (update.action === DynamicAttrPathActions.REMOVE) {
    current = current.filter((path) => path !== update.attrPath)
  }
  return current
}

const getNewAttrUpdatesAndDynamicAttrPaths = (
  widgetProps: Record<string, any>,
  updateSlice: Record<string, any>,
): {
  attrUpdates: Record<string, any>
  dynamicAttrPaths: string[]
} => {
  const newWidgetProps = cloneDeep(widgetProps)
  Object.keys(updateSlice).forEach((attrPath) => {
    const attrValue = updateSlice[attrPath]
    set(newWidgetProps, attrPath, attrValue)
  })
  const updatePaths = getAllPaths(updateSlice)
  const attrUpdates: Record<string, unknown> = {
    ...updateSlice,
  }
  const currentDynamicAttrPaths = getWidgetOrActionDynamicAttrPaths(widgetProps)
  const dynamicAttrPathUpdates: DynamicAttrPathUpdateShape[] = []
  Object.keys(updatePaths).forEach((attrPath) => {
    const attrValue = get(updateSlice, attrPath)
    dynamicAttrPathUpdates.push(
      getDynamicAttrPathUpdate(widgetProps, attrPath, attrValue),
    )
  })
  const dynamicAttrPaths = dynamicAttrPathUpdates.reduce(
    generateDynamicAttrPaths,
    currentDynamicAttrPaths,
  )
  return {
    attrUpdates,
    dynamicAttrPaths,
  }
}

export const getNewWidgetPropsByUpdateSlice = (
  displayName: string,
  updateSlice: Record<string, unknown>,
  widgetProps: Record<string, any>,
) => {
  let newWidgetProps = cloneDeep(widgetProps)
  if (Object.keys(updateSlice).length > 0) {
    const { attrUpdates, dynamicAttrPaths } =
      getNewAttrUpdatesAndDynamicAttrPaths(newWidgetProps, updateSlice)
    Object.keys(attrUpdates).forEach((attrPath) => {
      const attrValue = attrUpdates[attrPath]
      newWidgetProps = set(newWidgetProps, attrPath, attrValue)
    })
    newWidgetProps.$dynamicAttrPaths = dynamicAttrPaths
  }
  return newWidgetProps
}
