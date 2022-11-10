import { v4 } from "uuid"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"

export let viewNameSet = new Set<string>()

const generateDatasetName = (prefix: string) => {
  let i = 1
  let ViewName = `View ${i}`
  while (viewNameSet.has(`${prefix}-${ViewName}`)) {
    i++
    ViewName = `View ${i}`
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
