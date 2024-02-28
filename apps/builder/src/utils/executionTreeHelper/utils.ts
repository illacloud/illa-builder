import {
  convertPathToString,
  extractIdentifierInfoFromCode,
} from "@illa-public/dynamic-string"
import { toPath } from "lodash-es"
import { isObject } from "@/utils/typeHelper"

const IMMEDIATE_PARENT_REGEX = /^(.*)(\..*|\[.*\])$/

export const extractReferencesFromScript = (script: string): string[] => {
  const newReference = new Set<string>()
  const { references } = extractIdentifierInfoFromCode(script)

  references.forEach((identifier: string) => {
    newReference.add(identifier)
    const subPaths = toPath(identifier)
    let current = ""
    while (subPaths.length > 1) {
      current = convertPathToString(subPaths)
      newReference.add(current)
      subPaths.pop()
    }
  })
  return Array.from(newReference)
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

export const removeIgnoredKeys = (result: Record<string, unknown>) => {
  return Object.keys(result).reduce(
    (acc: Record<string, unknown>, key: string) => {
      const componentOrAction = result[key]
      if (isObject(componentOrAction)) {
        const updatedComponentOrAction = Object.keys(componentOrAction).reduce(
          (obj: Record<string, unknown>, innerKey: string) => {
            if (!innerKey.startsWith("$")) {
              obj[innerKey] = componentOrAction[innerKey]
            }
            return obj
          },
          {},
        )
        acc[key] = updatedComponentOrAction
      } else {
        acc[key] = componentOrAction
      }
      return acc
    },
    {},
  )
}

export const removeParentPath = (paths: string[]) => {
  const dotPaths = paths.map((path) => toPath(path).join("."))

  const filteredPaths = dotPaths.filter((path, index, array) => {
    return !array.some((otherPath, otherIndex) => {
      if (index === otherIndex) return false
      return otherPath.startsWith(`${path}.`)
    })
  })

  return filteredPaths.map((path) => convertPathToString(toPath(path)))
}

export const removeWidgetOrActionMethods = (
  result: Record<string, unknown>,
) => {
  return Object.keys(result).reduce(
    (acc: Record<string, unknown>, key: string) => {
      if (key === "utils") return acc
      const componentOrAction = result[key]
      if (
        isObject(componentOrAction) &&
        (componentOrAction.$type === "WIDGET" ||
          componentOrAction.$type === "ACTION")
      ) {
        const updatedComponentOrAction = Object.keys(componentOrAction).reduce(
          (obj: Record<string, unknown>, innerKey: string) => {
            const innerValue = componentOrAction[innerKey]
            if (typeof innerValue !== "function") {
              obj[innerKey] = componentOrAction[innerKey]
            }
            return obj
          },
          {},
        )
        acc[key] = updatedComponentOrAction
      } else {
        acc[key] = componentOrAction
      }
      return acc
    },
    {},
  )
}

export function getObjectPaths(obj: Record<string, unknown>, currentPath = "") {
  let paths: string[] = []

  if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      const newPath = Array.isArray(obj)
        ? `${currentPath}.${key}`
        : `${currentPath ? currentPath + "." : ""}${key}`
      if (typeof value === "object" && value !== null) {
        paths = paths.concat(
          getObjectPaths(value as Record<string, unknown>, newPath),
        )
      } else {
        paths.push(newPath)
      }
    })
  }

  return paths.map((path) => (path.startsWith(".") ? path.substr(1) : path))
}
