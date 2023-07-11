import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface RenderGuideModePanelSetterProps {
  config: PanelFieldConfig
  displayName: string
  isInList: boolean
  parentAttrName: string
  currentStep: number
}
