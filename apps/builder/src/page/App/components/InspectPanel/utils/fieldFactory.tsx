import { get } from "lodash-es"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export const canRenderField = (
  item: PanelFieldConfig,
  widgetProps: Record<string, any>,
) => {
  const { bindAttrName, shown } = item
  if (!bindAttrName || !shown) return true
  if (Array.isArray(bindAttrName)) {
    const values = bindAttrName.map((bindAttrNameItem) =>
      get(widgetProps, bindAttrNameItem),
    )
    return shown(...values)
  }

  return true
}
