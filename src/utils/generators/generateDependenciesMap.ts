import { flatten, get, toPath } from "lodash"
import { getSnippets } from "@/utils/evaluateDynamicString/dynamicConverter"
import { extractIdentifiersFromCode } from "@/utils/ast/ast"
import { isInt } from "@/utils/typeHelper"
import { DependenciesState } from "@/redux/currentApp/executionTree/dependencies/dependenciesState"
import {
  getAllPaths,
  getWidgetOrActionDynamicAttrPaths,
} from "@/utils/evaluateDynamicString/utils"

export const convertPathToString = (attrPath: Array<string | number>) => {
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

export const generateDependencies = (
  displayNameMapProps: Record<string, any>,
) => {
  let dependenciesMap: DependenciesState = {}
  let inverseDependenciesMap: DependenciesState = {}
  const allKeys = getAllPaths(displayNameMapProps)
  Object.keys(displayNameMapProps).forEach((displayName) => {
    const widgetProps = displayNameMapProps[displayName]
    const dynamicAttrPaths: string[] =
      getWidgetOrActionDynamicAttrPaths(widgetProps)
    if (dynamicAttrPaths.length) {
      dynamicAttrPaths.forEach((attrPath) => {
        const originValue = get(widgetProps, attrPath)
        const { jsSnippets } = getSnippets(originValue)
        const existingDeps = dependenciesMap[`${displayName}.${attrPath}`] || []
        dependenciesMap[`${displayName}.${attrPath}`] = existingDeps.concat(
          jsSnippets.filter((jsSnippet) => !!jsSnippet),
        )
      })
    }
  })

  Object.keys(dependenciesMap).forEach((key) => {
    dependenciesMap[key] = flatten(
      dependenciesMap[key].map((script) => {
        try {
          return extractReferencesFromScript(script, allKeys)
        } catch (e) {
          console.log("error", e)
          return []
        }
      }),
    )
  })

  Object.keys(dependenciesMap).forEach((path) => {
    if (dependenciesMap[path].length === 0) {
      inverseDependenciesMap[path] = inverseDependenciesMap[path] || []
    } else {
      dependenciesMap[path].forEach((dependency) => {
        inverseDependenciesMap[dependency] =
          inverseDependenciesMap[dependency] || []
        inverseDependenciesMap[dependency].push(path)
      })
    }
  })
  return inverseDependenciesMap
}
