import _ from "lodash"
import { getSnippets } from "@/utils/evaluateDynamicString/dynamicConverter"
import { extractIdentifiersFromCode } from "@/utils/ast/ast"
import { isInt, isObject } from "@/utils/typeHelper"
import { DependencyMap } from "@/redux/currentApp/executionTree/dependencies/dependenciesState"

export const convertPathToString = (arrPath: Array<string | number>) => {
  let string = ""
  arrPath.forEach((segment) => {
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

export const extractReferencesFromBinding = (
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
    const subpaths = _.toPath(identifier)
    let current = ""
    while (subpaths.length > 1) {
      current = convertPathToString(subpaths)
      if (allPaths.hasOwnProperty(current)) {
        references.add(current)
        return
      }
      subpaths.pop()
    }
  })
  return Array.from(references)
}

const getAllPaths = (
  widgets: Record<string, any>,
  curKey: string = "",
  result: Record<string, any> = {},
) => {
  if (curKey) result[curKey] = true
  if (Array.isArray(widgets)) {
    for (let i = 0; i < widgets.length; i++) {
      const tempKey = curKey ? `${curKey}[${i}]` : `${i}`
      getAllPaths(widgets[i], tempKey, result)
    }
  } else if (isObject(widgets)) {
    for (const key in widgets) {
      const tempKey = curKey ? `${curKey}.${key}` : `${key}`
      getAllPaths(widgets[key], tempKey, result)
    }
  }
  return result
}

export const generateDependencies = (
  displayNameMapProps: Record<string, any>,
) => {
  let dependenciesMap: DependencyMap = {}
  let inverseDependenciesMap: DependencyMap = {}
  const allKeys = getAllPaths(displayNameMapProps)
  Object.keys(displayNameMapProps).forEach((displayName) => {
    const widgetProps = displayNameMapProps[displayName]
    const dynamicStrings: string[] = widgetProps.$dynamicStrings ?? []
    if (dynamicStrings.length) {
      dynamicStrings.forEach((attrName) => {
        const originValue = _.get(widgetProps, attrName)
        const { jsSnippets } = getSnippets(originValue)
        const existingDeps = dependenciesMap[`${displayName}.${attrName}`] || []
        dependenciesMap[`${displayName}.${attrName}`] = existingDeps.concat(
          jsSnippets.filter((jsSnippet) => !!jsSnippet),
        )
      })
    }
  })

  Object.keys(dependenciesMap).forEach((key) => {
    dependenciesMap[key] = _.flatten(
      dependenciesMap[key].map((path) => {
        try {
          return extractReferencesFromBinding(path, allKeys)
        } catch (e) {
          console.log("error", e)
          return []
        }
      }),
    )
  })

  const removedEmptyDependencies = fixedDependenciesMap(dependenciesMap)

  Object.keys(removedEmptyDependencies).forEach((path) => {
    removedEmptyDependencies[path].forEach((dependency) => {
      inverseDependenciesMap[dependency] =
        inverseDependenciesMap[dependency] || []
      inverseDependenciesMap[dependency].push(path)
    })
  })
  return inverseDependenciesMap
}

export const fixedDependenciesMap = (dependencies: DependencyMap) => {
  Object.keys(dependencies).forEach((key) => {
    if (dependencies[key].length === 0) {
      delete dependencies[key]
    }
  })
  return dependencies
}
