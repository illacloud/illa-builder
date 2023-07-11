import { PanelFieldGroupConfig } from "@/page/App/components/InspectPanel/interface"
import { Guide } from "@/redux/guide/guideState"

export interface RenderPanelBarProps {
  config: PanelFieldGroupConfig
  displayName: string
  widgetProps: Record<string, any>
  guideInfo: Guide
}
