import { SectionViewShape } from "@illa-public/public-types"
import { v4 } from "uuid"

export let viewNameSet = new Set<string>()

const generateDatasetName = (prefix: string) => {
  let i = 1
  let ViewName = `sub-page${i}`
  while (viewNameSet.has(`${prefix}-${ViewName}`)) {
    i++
    ViewName = `sub-page${i}`
  }
  return ViewName
}

export const generateNewViewItem = (
  hasViewNameSet: string[],
  viewDisplayName: string,
  prefix: string,
): SectionViewShape => {
  viewNameSet = new Set<string>(hasViewNameSet)
  const viewName = generateDatasetName(prefix)

  return {
    id: v4(),
    key: viewName,
    path: viewName,
    viewDisplayName,
  }
}

export const generateNewViewItemFromBodySectionConfig = (
  hasPaths: string[],
  viewDisplayName: string,
  prefix: string,
  alternativeSubPaths: string[],
): SectionViewShape => {
  const prefixedViewPath = hasPaths.map((path) => `${prefix}-${path}`)
  viewNameSet = new Set<string>(prefixedViewPath)
  let viewName = ""
  if (alternativeSubPaths.length > 0) {
    viewName = alternativeSubPaths[0]
  }
  if (!viewName) viewName = generateDatasetName(prefix)

  return {
    id: v4(),
    key: viewName,
    path: viewName,
    viewDisplayName,
  }
}
