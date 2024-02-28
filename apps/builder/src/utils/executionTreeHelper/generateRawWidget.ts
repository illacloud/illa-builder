import { WidgetShape } from "@/utils/executionTreeHelper/interface"
import { generateAllTypePathsFromWidgetConfig } from "@/utils/generators/generateAllTypePathsFromWidgetConfig"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const generateRawWidget = (widget: WidgetShape) => {
  const { $widgetType } = widget
  const widgetConfig = widgetBuilder($widgetType)
  if (!widgetConfig) return widget
  const panelConfig = widgetConfig.panelConfig
  const { validationPaths } = generateAllTypePathsFromWidgetConfig(
    panelConfig,
    widget,
  )

  return {
    ...widget,
    $validationPaths: validationPaths,
  }
}
