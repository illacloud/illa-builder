import { v4 } from "uuid"
import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"

export let tabNameSet = new Set<string>()

const generateDatasetName = () => {
  let i = 1
  let TabName = `Tab ${i}`
  while (tabNameSet.has(TabName)) {
    i++
    TabName = `Tab ${i}`
  }
  return TabName
}

export const generateTabItemId = () => `views-${v4()}`

export const generateNewViewItem = (
  hasViewNameSet: string[],
): ViewItemShape => {
  tabNameSet = new Set<string>(hasViewNameSet)
  const tabName = generateDatasetName()

  return {
    id: generateTabItemId(),
    key: tabName,
    label: tabName,
  }
}
