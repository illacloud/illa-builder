import { isCloudVersion } from "@illa-public/utils"
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
  CAMERA_EVENT_HANDLER_CONFIG,
  CAMERA_PANEL_CONFIG,
  CAMERA_WIDGET_CONFIG,
} from "./CameraWidget"
import { CHART_PANEL_CONFIG, CHART_WIDGET_V2_CONFIG } from "./ChartWidget"
import {
  CHECKBOX_GROUP_PANEL_CONFIG,
  CHECKBOX_GROUP_WIDGET_CONFIG,
  CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
} from "./CheckboxGroupWidget"
import {
  CONTAINER_EVENT_HANDLER_CONFIG,
  CONTAINER_PANEL_CONFIG,
  CONTAINER_WIDGET_CONFIG,
} from "./ContainerWidget"
import {
  DATA_GRID_EVENT_HANDLER_CONFIG,
  DATA_GRID_PANEL_CONFIG,
  DATA_GRID_WIDGET_CONFIG,
} from "./DataGridWidget"
import {
  DRIVE_PICKER_EVENT_HANDLER_CONFIG,
  DRIVE_PICKER_PANEL_CONFIG,
  DRIVE_PICKER_WIDGET_CONFIG,
} from "./DrivePickerWidget"
import {
  GRID_LIST_EVENT_HANDLER_CONFIG,
  GRID_LIST_PANEL_CONFIG,
  GRID_LIST_WIDGET_CONFIG,
} from "./GridListWidget"
import {
  ICON_EVENT_HANDLER_CONFIG,
  ICON_PANEL_CONFIG,
  ICON_WIDGET_CONFIG,
} from "./IconWidget"
import {
  IMAGE_EVENT_HANDLER_CONFIG,
  IMAGE_PANEL_CONFIG,
  IMAGE_WIDGET_CONFIG,
} from "./ImageWidget"
import {
  JSON_EDITOR_EVENT_HANDLER_CONFIG,
  JSON_EDITOR_PANEL_CONFIG,
  JSON_EDITOR_WIDGET_CONFIG,
} from "./JsonEditorWidget"
import {
  JSON_SCHEMA_FORM_EVENT_HANDLER_CONFIG,
  JSON_SCHEMA_FORM_PANEL_CONFIG,
  JSON_SCHEMA_FORM_WIDGET_CONFIG,
} from "./JsonSchemaFormWidget"
import {
  LIST_EVENT_HANDLER_CONFIG,
  LIST_PANEL_CONFIG,
  LIST_WIDGET_CONFIG,
} from "./ListWidget"
import {
  RECORDING_HANDLER_CONFIG,
  RECORDING_PANEL_CONFIG,
  RECORDING_WIDGET_CONFIG,
} from "./RecordingWidget"
import {
  RICH_TEXT_EVENT_HANDLER_CONFIG,
  RICH_TEXT_PANEL_CONFIG,
  RICH_TEXT_WIDGET_CONFIG,
} from "./RichTextWidget"
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
import {
  TEXT_EVENT_HANDLER_CONFIG,
  TEXT_PANEL_CONFIG,
  TEXT_WIDGET_CONFIG,
} from "./TextWidget"

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
    JSON_EDITOR_WIDGET: {
      config: JSON_EDITOR_WIDGET_CONFIG,
      panelConfig: JSON_EDITOR_PANEL_CONFIG,
      eventHandlerConfig: JSON_EDITOR_EVENT_HANDLER_CONFIG,
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/JsonEditorWidget/jsonEditor"),
      ),
    },
    RICH_TEXT_WIDGET: {
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/RichTextWidget/richText"),
      ),
      config: RICH_TEXT_WIDGET_CONFIG,
      panelConfig: RICH_TEXT_PANEL_CONFIG,
      eventHandlerConfig: RICH_TEXT_EVENT_HANDLER_CONFIG,
    },
    JSON_SCHEMA_FORM_WIDGET: {
      widget: lazy(
        () =>
          import("@/widgetLibrary/Mobile/JsonSchemaFormWidget/jsonSchemaForm"),
      ),
      config: JSON_SCHEMA_FORM_WIDGET_CONFIG,
      panelConfig: JSON_SCHEMA_FORM_PANEL_CONFIG,
      eventHandlerConfig: JSON_SCHEMA_FORM_EVENT_HANDLER_CONFIG,
    },
    RECORDING_WIDGET: {
      config: RECORDING_WIDGET_CONFIG,
      panelConfig: RECORDING_PANEL_CONFIG,
      eventHandlerConfig: RECORDING_HANDLER_CONFIG,
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/RecordingWidget/recording"),
      ),
    },
    CHART_WIDGET: {
      config: CHART_WIDGET_V2_CONFIG,
      panelConfig: CHART_PANEL_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/ChartWidget/chart")),
    },
    CONTAINER_WIDGET: {
      config: CONTAINER_WIDGET_CONFIG,
      panelConfig: CONTAINER_PANEL_CONFIG,
      eventHandlerConfig: CONTAINER_EVENT_HANDLER_CONFIG,
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/ContainerWidget/container"),
      ),
    },
    DATA_GRID_WIDGET: {
      config: DATA_GRID_WIDGET_CONFIG,
      panelConfig: DATA_GRID_PANEL_CONFIG,
      eventHandlerConfig: DATA_GRID_EVENT_HANDLER_CONFIG,
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/DataGridWidget/dataGrid"),
      ),
    },
    LIST_WIDGET: {
      config: LIST_WIDGET_CONFIG,
      panelConfig: LIST_PANEL_CONFIG,
      eventHandlerConfig: LIST_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/ListWidget/list")),
    },
    GRID_LIST_WIDGET: {
      config: GRID_LIST_WIDGET_CONFIG,
      panelConfig: GRID_LIST_PANEL_CONFIG,
      eventHandlerConfig: GRID_LIST_EVENT_HANDLER_CONFIG,
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/GridListWidget/gridList"),
      ),
    },
    ICON_WIDGET: {
      config: ICON_WIDGET_CONFIG,
      panelConfig: ICON_PANEL_CONFIG,
      eventHandlerConfig: ICON_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/PC/IconWidget/icon")),
    },
    TEXT_WIDGET: {
      config: TEXT_WIDGET_CONFIG,
      panelConfig: TEXT_PANEL_CONFIG,
      eventHandlerConfig: TEXT_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/TextWidget/text")),
    },
    IMAGE_WIDGET: {
      config: IMAGE_WIDGET_CONFIG,
      panelConfig: IMAGE_PANEL_CONFIG,
      eventHandlerConfig: IMAGE_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/ImageWidget/image")),
    },
  }

  if (isCloudVersion) {
    MobileWidgetConfigMap["DRIVE_PICKER_WIDGET"] = {
      config: DRIVE_PICKER_WIDGET_CONFIG,
      panelConfig: DRIVE_PICKER_PANEL_CONFIG,
      eventHandlerConfig: DRIVE_PICKER_EVENT_HANDLER_CONFIG,
      widget: lazy(
        () => import("@/widgetLibrary/Mobile/DrivePickerWidget/drivePicker"),
      ),
    }
    MobileWidgetConfigMap["CAMERA_WIDGET"] = {
      config: CAMERA_WIDGET_CONFIG,
      panelConfig: CAMERA_PANEL_CONFIG,
      eventHandlerConfig: CAMERA_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/Mobile/CameraWidget/camera")),
    }
  }

  return MobileWidgetConfigMap
}
