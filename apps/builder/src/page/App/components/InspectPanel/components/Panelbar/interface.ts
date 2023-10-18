import { PanelFieldGroupConfig } from "@/page/App/components/InspectPanel/interface"

export interface RenderPanelBarProps {
  config: PanelFieldGroupConfig
  displayName: string
  widgetProps: Record<string, any>
}
