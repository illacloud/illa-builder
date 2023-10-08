import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

export interface FieldFactoryProps {
  panelConfig: PanelConfig[]
  displayName: string
  widgetProps: Record<string, any>
}
