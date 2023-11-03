import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export interface DriveSourceGroupSetterProps extends BaseSetter {
  value?: string
}

export interface SelectItemValue {
  fileURL: string
  tinyURL: string
  fileID: string
}
