import { widgetBuilder, WidgetType } from "./WidgetBuilder"
import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"

export const panelBuilder = (type: WidgetType): PanelConfig[] | null => {
  if (!type) return null
  return widgetBuilder(type).panelConfig
}
