import { Diff } from "deep-diff"
import { RawTreeShape } from "@/utils/executionTreeHelper/interface"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"
import { isInt, isObject } from "@/utils/typeHelper"
import { extractIdentifiersFromCode } from "@/utils/ast/ast"
import { toPath } from "lodash"

export enum RawTreeDiffEvent {
  NEW = "NEW",
  DELETE = "DELETE",
  EDIT = "EDIT",
  NOOP = "NOOP",
}

export type RawTreeDiff = {
  payload: {
    propertyPath: string
    value?: string
  }
  event: RawTreeDiffEvent
}

const ignorePathsForEvalRegex = ".($dynamicAttrPaths)"

const isUninterestingChangeForDependencyUpdate = (path: string) => {
  return path.match(ignorePathsForEvalRegex)
}

export const convertPathToString = (attrPath: string[] | number[]) => {
  let string = ""
  attrPath.forEach((segment) => {
    if (isInt(segment)) {
      string = string + "[" + segment + "]"
    } else {
      if (string.length !== 0) {
        string = string + "."
      }
      string = string + segment
    }
  })
  return string
}

export const extractReferencesFromScript = (
  script: string,
  allPaths: Record<string, true>,
): string[] => {
  const references: Set<string> = new Set<string>()
  const identifiers = extractIdentifiersFromCode(script)
  identifiers.forEach((identifier: string) => {
    if (allPaths.hasOwnProperty(identifier)) {
      references.add(identifier)
      return
    }
    const subPaths = toPath(identifier)
    let current = ""
    while (subPaths.length > 1) {
      current = convertPathToString(subPaths)
      if (allPaths.hasOwnProperty(current)) {
        references.add(current)
        return
      }
      subPaths.pop()
    }
  })
  return Array.from(references)
}

export function getDisplayNameAndPropertyPath(fullPath: string): {
  displayName: string
  attrPath: string
} {
  const indexOfFirstDot = fullPath.indexOf(".")
  if (indexOfFirstDot === -1) {
    return {
      displayName: fullPath,
      attrPath: "",
    }
  }
  const displayName = fullPath.substring(0, indexOfFirstDot)
  const attrPath = fullPath.substring(indexOfFirstDot + 1)
  return { displayName, attrPath }
}

export const translateDiffEventToRawTreeEvent = (
  diff: Diff<any, any>,
  rawTree: RawTreeShape,
): RawTreeDiff | RawTreeDiff[] => {
  let result: RawTreeDiff | RawTreeDiff[] = {
    payload: {
      propertyPath: "",
      value: "",
    },
    event: RawTreeDiffEvent.NOOP,
  }
  if (!diff.path) {
    return result
  }
  const propertyPath = convertPathToString(diff.path)
  const isUninterestingPathForUpdateTree =
    isUninterestingChangeForDependencyUpdate(propertyPath)
  if (!!isUninterestingPathForUpdateTree) {
    return result
  }
  const { displayName } = getDisplayNameAndPropertyPath(propertyPath)
  const entity = rawTree[displayName]

  switch (diff.kind) {
    case "N": {
      result.event = RawTreeDiffEvent.NEW
      result.payload = {
        propertyPath,
      }
      break
    }
    case "D": {
      result.event = RawTreeDiffEvent.DELETE
      result.payload = { propertyPath }
      break
    }
    case "E": {
      let rhsChange = typeof diff.rhs === "string" && isDynamicString(diff.rhs),
        lhsChange = typeof diff.lhs === "string" && isDynamicString(diff.lhs)
      if (rhsChange || lhsChange) {
        result.event = RawTreeDiffEvent.EDIT
        result.payload = {
          propertyPath,
          value: diff.rhs,
        }
      } else if (diff.lhs === undefined || diff.rhs === undefined) {
        if (
          diff.lhs === undefined &&
          (isObject(diff.rhs) || Array.isArray(diff.rhs))
        ) {
          result.event = RawTreeDiffEvent.NEW
          result.payload = { propertyPath }
        }
        if (
          diff.rhs === undefined &&
          (isObject(diff.lhs) || Array.isArray(diff.lhs))
        ) {
          result.event = RawTreeDiffEvent.DELETE
          result.payload = { propertyPath }
        }
      }
      break
    }
    case "A": {
      return translateDiffEventToRawTreeEvent(
        {
          ...diff.item,
          path: [...diff.path, diff.index],
        },
        rawTree,
      )
    }
    default: {
      break
    }
  }

  return result
}
