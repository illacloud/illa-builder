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

const ignorePathsForEvalRegex = /.(\$dynamicAttrPaths)/
const IMMEDIATE_PARENT_REGEX = /^(.*)(\..*|\[.*\])$/

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

export const translateDiffArrayIndexAccessors = (
  propertyPath: string,
  array: unknown[],
  event: RawTreeDiffEvent,
) => {
  const result: RawTreeDiff[] = []
  array.forEach((data, index) => {
    const path = `${propertyPath}[${index}]`
    result.push({
      event,
      payload: {
        propertyPath: path,
      },
    })
  })
  return result
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
      } else if (isObject(diff.lhs) && !isObject(diff.rhs)) {
        result = Object.keys(diff.lhs).map((diffKey) => {
          const path = `${propertyPath}.${diffKey}`
          return {
            event: RawTreeDiffEvent.DELETE,
            payload: {
              propertyPath: path,
            },
          }
        })
        if (Array.isArray(diff.rhs)) {
          result = result.concat(
            translateDiffArrayIndexAccessors(
              propertyPath,
              diff.rhs,
              RawTreeDiffEvent.NEW,
            ),
          )
        }
      }
      break
    }
    case "A": {
      const result = translateDiffEventToRawTreeEvent(
        {
          ...diff.item,
          path: [...diff.path, diff.index],
        },
        rawTree,
      )
      console.log("result", result)
      return result
    }
    default: {
      break
    }
  }

  return result
}

export function isWidget(entity: Record<string, any>) {
  return (
    typeof entity === "object" && "$type" in entity && entity.$type === "WIDGET"
  )
}

export function isAction(entity: Record<string, any>) {
  return (
    typeof entity === "object" && "$type" in entity && entity.$type === "ACTION"
  )
}

export const getImmediateParentsOfPropertyPaths = (
  propertyPaths: string[],
): string[] => {
  const parents: Set<string> = new Set()

  propertyPaths.forEach((path) => {
    const matches = path.match(IMMEDIATE_PARENT_REGEX)

    if (matches !== null) {
      parents.add(matches[1])
    }
  })

  return Array.from(parents)
}
