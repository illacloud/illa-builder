import { v4 } from "uuid"
import { ViewItemShape } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/interface"

export const generateNewViewItem = (label: string): ViewItemShape => {
  return {
    id: `views-${v4()}`,
    key: `views-${v4()}`,
    label: label,
  }
}
