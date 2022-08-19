import { widgetBuilder, WidgetType } from "./widgetBuilder"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

export const panelBuilder = (type: WidgetType): PanelConfig[] | null => {
  if (!type) return null
  return widgetBuilder(type).panelConfig
}
