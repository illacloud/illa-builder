import { TextPanelConfig } from "./Text/panelConfig"
import { ImagePanelConfig } from "./Image/panelConfig"

const PanelConfig = {
  TEXT_WIDGET: TextPanelConfig,
  IMAGE_WIDGET: ImagePanelConfig,
}

export type WidgetType = keyof typeof PanelConfig

export const panelBuilder = (type: WidgetType) => {
  return PanelConfig[type]
}
