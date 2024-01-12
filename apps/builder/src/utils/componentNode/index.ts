import {
  convertPathToString,
  hasDynamicStringSnippet,
} from "@illa-public/dynamic-string"
import deepDiff, { Diff } from "deep-diff"
import { klona } from "klona/json"
import { set } from "lodash-es"
import { getWidgetOrActionDynamicAttrPaths } from "@/utils/evaluateDynamicString/utils"
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

const getNewEffectByUpdateSlice = (
  path: string,
  rValue: unknown,
): DynamicAttrPathUpdateShape | DynamicAttrPathUpdateShape[] => {
  if (isObject(rValue)) {
    return Object.keys(rValue as Record<string, unknown>)
      .map((key: string) => {
        const subPath = `${path}.${key}`
        return getNewEffectByUpdateSlice(
          subPath,
          (rValue as Record<string, unknown>)[key],
        )
      })
      .flat()
  }
  if (Array.isArray(rValue)) {
    return (rValue as unknown[])
      .map((item: unknown, index: number) => {
        const subPath = convertPathToString([path, `${index}`])
        return getNewEffectByUpdateSlice(subPath, item)
      })
      .flat()
  }
  const isRDynamic = hasDynamicStringSnippet(rValue as string)
  return {
    attrPath: path,
    action: isRDynamic
      ? DynamicAttrPathActions.ADD
      : DynamicAttrPathActions.NONE,
  }
}

const getUpdateSlicePathAndEffect = (
  diff: Diff<Record<string, unknown>, Record<string, unknown>>,
): DynamicAttrPathUpdateShape | DynamicAttrPathUpdateShape[] => {
  const path = convertPathToString((diff?.path ?? []) as string[])
  switch (diff.kind) {
    case "N": {
      const { rhs } = diff
      if (!isObject(rhs) && !Array.isArray(rhs)) {
        let stringRValue: any = isObject(rhs) ? JSON.stringify(rhs) : rhs
        const isRDynamic = hasDynamicStringSnippet(stringRValue)

        return {
          attrPath: path,
          action: isRDynamic
            ? DynamicAttrPathActions.ADD
            : DynamicAttrPathActions.NONE,
        }
      } else {
        return getNewEffectByUpdateSlice(path, rhs)
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

      const isRDynamic = hasDynamicStringSnippet(stringRValue)
      const isLDynamic = hasDynamicStringSnippet(stringLValue)
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
  let newWidgetProps = klona(oldWidgetProps)
  Object.keys(updateSlice).forEach((attrPath) => {
    set(newWidgetProps, attrPath, updateSlice[attrPath])
  })

  const diffs = deepDiff(oldWidgetProps, newWidgetProps)
  if (!Array.isArray(diffs)) return oldWidgetProps
  const dynamicAttrPathUpdates: DynamicAttrPathUpdateShape[] = diffs
    .map((diff) => getUpdateSlicePathAndEffect(diff))
    .flat()
  const currentDynamicAttrPaths =
    getWidgetOrActionDynamicAttrPaths(oldWidgetProps)

  const dynamicAttrPaths = dynamicAttrPathUpdates.reduce(
    generateDynamicAttrPaths,
    currentDynamicAttrPaths,
  )

  newWidgetProps.$dynamicAttrPaths = dynamicAttrPaths
  return newWidgetProps
}
