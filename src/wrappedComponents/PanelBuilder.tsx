import { TextPanelConfig } from "./Text/panelConfig"
import { ImagePanelConfig } from "./Image/panelConfig"
import { SwitchPanelConfig } from "./Switch/panelConfig"
import { ButtonPanelConfig } from "./Button/panelConfig"
import { SelectPanelConfig } from "./Select/panelConfig"

const PanelConfig = {
  TEXT_WIDGET: TextPanelConfig,
  IMAGE_WIDGET: ImagePanelConfig,
  SWITCH_WIDGET: SwitchPanelConfig,
  BUTTON_WIDGET: ButtonPanelConfig,
  SELECT_WIDGET: SelectPanelConfig,
}

export type WidgetType = keyof typeof PanelConfig

export const panelBuilder = (type: WidgetType) => {
  return PanelConfig[type]
}
