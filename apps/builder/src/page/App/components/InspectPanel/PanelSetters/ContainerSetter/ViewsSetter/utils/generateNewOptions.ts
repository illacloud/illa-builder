import { v4 } from "uuid"
import { ViewItemShape } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/interface"

export let viewNameSet = new Set<string>()

const generateDatasetName = () => {
  let i = 1
  let ViewName = `View ${i}`
  while (viewNameSet.has(ViewName)) {
    i++
    ViewName = `View ${i}`
  }
  return ViewName
}

export const generateViewItemId = () => `views-${v4()}`

export const generateNewViewItem = (
  hasViewNameSet: string[],
): ViewItemShape => {
  viewNameSet = new Set<string>(hasViewNameSet)
  const viewName = generateDatasetName()

  return {
    id: generateViewItemId(),
    key: viewName,
    label: viewName,
  }
}
