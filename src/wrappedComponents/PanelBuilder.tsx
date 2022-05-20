import { TextPanelConfig } from "./Text/panelConfig"
import { ImagePanelConfig } from "./Image/panelConfig"
import { SwitchPanelConfig } from "./Switch/panelConfig"

const PanelConfig = {
  TEXT_WIDGET: TextPanelConfig,
  IMAGE_WIDGET: ImagePanelConfig,
  SWITCH_WIDGET: SwitchPanelConfig,
}

export type WidgetType = keyof typeof PanelConfig

export const panelBuilder = (type: WidgetType) => {
  return PanelConfig[type]
}
