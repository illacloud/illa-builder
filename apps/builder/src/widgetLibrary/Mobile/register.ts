import { FC, LazyExoticComponent, lazy } from "react"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  INPUT_EVENT_HANDLER_CONFIG,
  INPUT_PANEL_CONFIG,
  INPUT_WIDGET_CONFIG,
} from "@/widgetLibrary/Mobile/InputWidget"
import { EventHandlerConfig, WidgetConfig } from "../interface"
import {
  BUTTON_EVENT_HANDLER_CONFIG,
  BUTTON_PANEL_CONFIG,
  BUTTON_WIDGET_CONFIG,
} from "./ButtonWidget"
import {
  CHECKBOX_GROUP_PANEL_CONFIG,
  CHECKBOX_GROUP_WIDGET_CONFIG,
  CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
} from "./CheckboxGroupWidget"
import {
  SLIDER_EVENT_HANDLER_CONFIG,
  SLIDER_PANEL_CONFIG,
  SLIDER_WIDGET_CONFIG,
} from "./SliderWidget"
import {
  SWITCH_EVENT_HANDLER_CONFIG,
  SWITCH_PANEL_CONFIG,
  SWITCH_WIDGET_CONFIG,
} from "./SwitchWidget"
import {
  TEXTAREA_EVENT_HANDLER_CONFIG,
  TEXTAREA_PANEL_CONFIG,
  TEXTAREA_WIDGET_CONFIG,
} from "./TextAreaWidget"

export const getMobileWidgetConfig = () => {
  const MobileWidgetConfigMap: Record<
    string,
    {
      config: WidgetConfig
      panelConfig: PanelConfig[]
      eventHandlerConfig?: EventHandlerConfig
      widget: LazyExoticComponent<FC<any>>
    }
  > = {
    // inputs
    INPUT_WIDGET: {
      config: INPUT_WIDGET_CONFIG,
      panelConfig: INPUT_PANEL_CONFIG,
      eventHandlerConfig: INPUT_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/InputWidget/input")),
    },
    BUTTON_WIDGET: {
      config: BUTTON_WIDGET_CONFIG,
      panelConfig: BUTTON_PANEL_CONFIG,
      eventHandlerConfig: BUTTON_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/ButtonWidget/button")),
    },
    TEXTAREA_INPUT_WIDGET: {
      config: TEXTAREA_WIDGET_CONFIG,
      panelConfig: TEXTAREA_PANEL_CONFIG,
      eventHandlerConfig: TEXTAREA_EVENT_HANDLER_CONFIG,
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/TextAreaWidget/textArea"),
      ),
    },
    SLIDER_WIDGET: {
      config: SLIDER_WIDGET_CONFIG,
      panelConfig: SLIDER_PANEL_CONFIG,
      eventHandlerConfig: SLIDER_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/SliderWidget/slider")),
    },
    // select inputs
    SWITCH_WIDGET: {
      config: SWITCH_WIDGET_CONFIG,
      panelConfig: SWITCH_PANEL_CONFIG,
      eventHandlerConfig: SWITCH_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/SwitchWidget/switch")),
    },
    CHECKBOX_GROUP_WIDGET: {
      config: CHECKBOX_GROUP_WIDGET_CONFIG,
      panelConfig: CHECKBOX_GROUP_PANEL_CONFIG,
      eventHandlerConfig: CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
      widget: lazy(
        () =>
          import("@/widgetLibrary/Mobile/CheckboxGroupWidget/checkboxGroup"),
      ),
    },
  }

  return MobileWidgetConfigMap
}
