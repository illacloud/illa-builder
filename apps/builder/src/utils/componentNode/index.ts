import deepDiff, { Diff } from "deep-diff"
import { cloneDeep, set } from "lodash"
import {
  getWidgetOrActionDynamicAttrPaths,
  isDynamicString,
} from "@/utils/evaluateDynamicString/utils"
import { isObject } from "@/utils/typeHelper"
import { convertPathToString } from "../executionTreeHelper/utils"

enum DynamicAttrPathActions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  NONE = "NONE",
}

interface DynamicAttrPathUpdateShape {
  attrPath: string
  action: DynamicAttrPathActions
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

const getUpdateSlicePathAndEffect = (
  diff: Diff<Record<string, unknown>, Record<string, unknown>>,
): DynamicAttrPathUpdateShape => {
  const path = convertPathToString((diff?.path ?? []) as string[])
  switch (diff.kind) {
    case "N": {
      const { rhs } = diff
      let stringRValue: any = isObject(rhs) ? JSON.stringify(rhs) : rhs
      const isRDynamic = isDynamicString(stringRValue)
      return {
        attrPath: path,
        action: isRDynamic
          ? DynamicAttrPathActions.ADD
          : DynamicAttrPathActions.NONE,
      }
    }
    case "D": {
      const { lhs } = diff
      let stringLValue: any = isObject(lhs) ? JSON.stringify(lhs) : lhs
      return {
        attrPath: path,
        action: stringLValue
          ? DynamicAttrPathActions.REMOVE
          : DynamicAttrPathActions.NONE,
      }
    }
    case "E": {
      const { lhs, rhs } = diff
      let stringRValue: any = isObject(rhs) ? JSON.stringify(rhs) : rhs
      let stringLValue: any = isObject(lhs) ? JSON.stringify(lhs) : lhs

      const isRDynamic = isDynamicString(stringRValue)
      const isLDynamic = isDynamicString(stringLValue)
      if (isRDynamic && !isLDynamic) {
        return {
          attrPath: path,
          action: DynamicAttrPathActions.ADD,
        }
      }
      if (!isRDynamic && isLDynamic) {
        return {
          attrPath: path,
          action: DynamicAttrPathActions.REMOVE,
        }
      }
      return {
        attrPath: path,
        action: DynamicAttrPathActions.NONE,
      }
    }
    case "A": {
      return getUpdateSlicePathAndEffect({
        ...diff.item,
        path: [...(diff.path as string[]), diff.index],
      }) as DynamicAttrPathUpdateShape
    }
  }
}

export const getNewWidgetPropsByUpdateSlice = (
  updateSlice: Record<string, unknown>,
  oldWidgetProps: Record<string, unknown>,
) => {
  let newWidgetProps = cloneDeep(oldWidgetProps)
  Object.keys(updateSlice).forEach((attrPath) => {
    set(newWidgetProps, attrPath, updateSlice[attrPath])
  })

  const diffs = deepDiff(oldWidgetProps, newWidgetProps)
  if (!Array.isArray(diffs)) return oldWidgetProps
  const dynamicAttrPathUpdates: DynamicAttrPathUpdateShape[] = diffs.map(
    (diff) => getUpdateSlicePathAndEffect(diff),
  )
  const currentDynamicAttrPaths =
    getWidgetOrActionDynamicAttrPaths(oldWidgetProps)

  const dynamicAttrPaths = dynamicAttrPathUpdates.reduce(
    generateDynamicAttrPaths,
    currentDynamicAttrPaths,
  )

  newWidgetProps.$dynamicAttrPaths = dynamicAttrPaths
  return newWidgetProps
}
