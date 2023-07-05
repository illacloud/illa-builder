import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { WidgetType, widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const panelBuilder = (type: WidgetType): PanelConfig[] | null => {
  if (!type) return null
  if (!widgetBuilder(type)) return null
  return widgetBuilder(type).panelConfig
}
