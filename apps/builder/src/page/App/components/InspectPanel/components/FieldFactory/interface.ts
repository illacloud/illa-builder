import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { Guide } from "@/redux/guide/guideState"

export interface FieldFactoryProps {
  panelConfig: PanelConfig[]
  displayName: string
  widgetProps: Record<string, any>
  guideInfo: Guide
  isInList?: boolean
}
