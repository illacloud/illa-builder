import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { Guide } from "@/redux/guide/guideState"

export interface RenderFieldAndLabelProps {
  config: PanelFieldConfig
  displayName: string
  isInList: boolean
  parentAttrName: string
  guideInfo?: Guide
}
