import { isCloudVersion } from "@illa-public/utils"
import { FC, LazyExoticComponent, lazy } from "react"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  AUDIO_EVENT_HANDLER_CONFIG,
  AUDIO_PANEL_CONFIG,
  AUDIO_WIDGET_CONFIG,
} from "@/widgetLibrary/AudioWidget"
import {
  BAR_PROGRESS_EVENT_HANDLER_CONFIG,
  BAR_PROGRESS_PANEL_CONFIG,
  BAR_PROGRESS_WIDGET_CONFIG,
} from "@/widgetLibrary/BarProgressWidget"
import {
  BUTTON_EVENT_HANDLER_CONFIG,
  BUTTON_PANEL_CONFIG,
  BUTTON_WIDGET_CONFIG,
} from "@/widgetLibrary/ButtonWidget"
import {
  CAROUSEL_EVENT_HANDLER_CONFIG,
  CAROUSEL_PANEL_CONFIG,
  CAROUSEL_WIDGET_CONFIG,
} from "@/widgetLibrary/CarouselWidget"
import {
  CASCADER_PANEL_CONFIG,
  CASCADER_WIDGET_CONFIG,
} from "@/widgetLibrary/CascaderWidget"
import { CASCADER_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/CascaderWidget/eventHandlerConfig"
import {
  CHART_PANEL_CONFIG,
  CHART_WIDGET_CONFIG,
  CHART_WIDGET_V2_CONFIG,
} from "@/widgetLibrary/ChartWidget"
import {
  CHAT_EVENT_HANDLER_CONFIG,
  CHAT_PANEL_CONFIG,
  CHAT_WIDGET_CONFIG,
} from "@/widgetLibrary/ChatWidget"
import {
  CHECKBOX_GROUP_PANEL_CONFIG,
  CHECKBOX_GROUP_WIDGET_CONFIG,
  CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
} from "@/widgetLibrary/CheckboxGroupWidget"
import {
  CIRCLE_PROGRESS_EVENT_HANDLER_CONFIG,
  CIRCLE_PROGRESS_PANEL_CONFIG,
  CIRCLE_PROGRESS_WIDGET_CONFIG,
} from "@/widgetLibrary/CircleProgressWidget"
import {
  CONTAINER_EVENT_HANDLER_CONFIG,
  CONTAINER_PANEL_CONFIG,
  CONTAINER_WIDGET_CONFIG,
} from "@/widgetLibrary/ContainerWidget"
import {
  DATA_GRID_EVENT_HANDLER_CONFIG,
  DATA_GRID_PANEL_CONFIG,
  DATA_GRID_WIDGET_CONFIG,
} from "@/widgetLibrary/DataGridWidget"
import {
  DATE_RANGE_EVENT_HANDLER_CONFIG,
  DATE_RANGE_PANEL_CONFIG,
  DATE_RANGE_WIDGET_CONFIG,
} from "@/widgetLibrary/DateRangeWidget"
import {
  DATE_TIME_EVENT_HANDLER_CONFIG,
  DATE_TIME_PANEL_CONFIG,
  DATE_TIME_WIDGET_CONFIG,
} from "@/widgetLibrary/DateTimeWidget"
import {
  DATE_EVENT_HANDLER_CONFIG,
  DATE_PANEL_CONFIG,
  DATE_WIDGET_CONFIG,
} from "@/widgetLibrary/DateWidget"
import {
  DIVIDER_EVENT_HANDLER_CONFIG,
  DIVIDER_PANEL_CONFIG,
  DIVIDER_WIDGET_CONFIG,
} from "@/widgetLibrary/DividerWidget"
import {
  DRIVE_PICKER_EVENT_HANDLER_CONFIG,
  DRIVE_PICKER_PANEL_CONFIG,
  DRIVE_PICKER_WIDGET_CONFIG,
} from "@/widgetLibrary/DrivePickerWidget"
import {
  EDITABLE_EVENT_HANDLER_CONFIG,
  EDITABLE_TEXT_PANEL_CONFIG,
  EDITABLE_TEXT_WIDGET_CONFIG,
} from "@/widgetLibrary/EditableWidget"
import {
  EVENT_CALENDAR_EVENT_HANDLER_CONFIG,
  EVENT_CALENDAR_PANEL_CONFIG,
  EVENT_CALENDAR_WIDGET_CONFIG,
} from "@/widgetLibrary/EventCalendarWidget"
import {
  FORM_EVENT_HANDLER_CONFIG,
  FORM_PANEL_CONFIG,
  FORM_WIDGET_CONFIG,
} from "@/widgetLibrary/FormWidget"
import {
  IFRAME_PANEL_CONFIG,
  IFRAME_WIDGET_CONFIG,
} from "@/widgetLibrary/IFrameWidget"
import {
  ICON_EVENT_HANDLER_CONFIG,
  ICON_PANEL_CONFIG,
  ICON_WIDGET_CONFIG,
} from "@/widgetLibrary/IconWidget"
import {
  IMAGE_EVENT_HANDLER_CONFIG,
  IMAGE_PANEL_CONFIG,
  IMAGE_WIDGET_CONFIG,
} from "@/widgetLibrary/ImageWidget"
import {
  INPUT_EVENT_HANDLER_CONFIG,
  INPUT_PANEL_CONFIG,
  INPUT_WIDGET_CONFIG,
} from "@/widgetLibrary/InputWidget"
import {
  JSON_EDITOR_EVENT_HANDLER_CONFIG,
  JSON_EDITOR_PANEL_CONFIG,
  JSON_EDITOR_WIDGET_CONFIG,
} from "@/widgetLibrary/JsonEditorWidget"
import {
  JSON_SCHEMA_FORM_EVENT_HANDLER_CONFIG,
  JSON_SCHEMA_FORM_PANEL_CONFIG,
  JSON_SCHEMA_FORM_WIDGET_CONFIG,
} from "@/widgetLibrary/JsonSchemaFormWidget"
import {
  LIST_EVENT_HANDLER_CONFIG,
  LIST_PANEL_CONFIG,
  LIST_WIDGET_CONFIG,
} from "@/widgetLibrary/ListWidget"
import {
  MAP_EVENT_HANDLER_CONFIG,
  MAP_PANEL_CONFIG,
  MAP_WIDGET_CONFIG,
} from "@/widgetLibrary/MapBoxWidget"
import {
  MENU_EVENT_HANDLER_CONFIG,
  MENU_PANEL_CONFIG,
  MENU_WIDGET_CONFIG,
} from "@/widgetLibrary/MenuWidget"
import {
  MODAL_EVENT_HANDLER_CONFIG,
  MODAL_PANEL_CONFIG,
  MODAL_WIDGET_CONFIG,
} from "@/widgetLibrary/ModalWidget"
import {
  MULTISELECT_EVENT_HANDLER_CONFIG,
  MULTISELECT_PANEL_CONFIG,
  MULTISELECT_WIDGET_CONFIG,
} from "@/widgetLibrary/MultiselectWidget"
import {
  INPUT_NUMBER_EVENT_HANDLER_CONFIG,
  NUMBER_INPUT_PANEL_CONFIG,
  NUMBER_INPUT_WIDGET_CONFIG,
} from "@/widgetLibrary/NumberInputWidget"
import {
  PDF_EVENT_HANDLER_CONFIG,
  PDF_PANEL_CONFIG,
  PDF_WIDGET_CONFIG,
} from "@/widgetLibrary/PdfWidget"
import {
  RADIO_BUTTON_EVENT_HANDLER_CONFIG,
  RADIO_BUTTON_PANEL_CONFIG,
  RADIO_BUTTON_WIDGET_CONFIG,
} from "@/widgetLibrary/RadioButtonWidget"
import {
  RADIO_GROUP_EVENT_HANDLER_CONFIG,
  RADIO_GROUP_PANEL_CONFIG,
  RADIO_GROUP_WIDGET_CONFIG,
} from "@/widgetLibrary/RadioGroupWidget"
import {
  RANGE_SLIDER_EVENT_HANDLER_CONFIG,
  RANGE_SLIDER_PANEL_CONFIG,
  RANGE_SLIDER_WIDGET_CONFIG,
} from "@/widgetLibrary/RangeSliderWidget"
import {
  RATE_EVENT_HANDLER_CONFIG,
  RATE_PANEL_CONFIG,
  RATE_WIDGET_CONFIG,
} from "@/widgetLibrary/RateWidget"
import {
  RECORDING_HANDLER_CONFIG,
  RECORDING_PANEL_CONFIG,
  RECORDING_WIDGET_CONFIG,
} from "@/widgetLibrary/RecordingWidget"
import {
  RICH_TEXT_EVENT_HANDLER_CONFIG,
  RICH_TEXT_PANEL_CONFIG,
  RICH_TEXT_WIDGET_CONFIG,
} from "@/widgetLibrary/RichTextWidget"
import {
  SELECT_EVENT_HANDLER_CONFIG,
  SELECT_PANEL_CONFIG,
  SELECT_WIDGET_CONFIG,
} from "@/widgetLibrary/SelectWidget"
import {
  SLIDER_EVENT_HANDLER_CONFIG,
  SLIDER_PANEL_CONFIG,
  SLIDER_WIDGET_CONFIG,
} from "@/widgetLibrary/SliderWidget"
import {
  STATISTICS_EVENT_HANDLER_CONFIG,
  STATISTICS_PANEL_CONFIG,
  STATISTICS_WIDGET_CONFIG,
} from "@/widgetLibrary/StatisticsWidget"
import {
  STEPS_EVENT_HANDLER_CONFIG,
  STEPS_PANEL_CONFIG,
  STEPS_WIDGET_CONFIG,
} from "@/widgetLibrary/StepsWidget"
import {
  SWITCH_GROUP_EVENT_HANDLER_CONFIG,
  SWITCH_GROUP_PANEL_CONFIG,
  SWITCH_GROUP_WIDGET_CONFIG,
} from "@/widgetLibrary/SwitchGroupWidget"
import {
  SWITCH_EVENT_HANDLER_CONFIG,
  SWITCH_PANEL_CONFIG,
  SWITCH_WIDGET_CONFIG,
} from "@/widgetLibrary/SwitchWidget"
import {
  TABLE_EVENT_HANDLER_CONFIG,
  TABLE_PANEL_CONFIG,
  TABLE_WIDGET_CONFIG,
} from "@/widgetLibrary/TableWidget"
import {
  TABS_EVENT_HANDLER_CONFIG,
  TABS_PANEL_CONFIG,
  TABS_WIDGET_CONFIG,
} from "@/widgetLibrary/TabsWidget"
import {
  TAGS_EVENT_HANDLER_CONFIG,
  TAGS_PANEL_CONFIG,
  TAGS_WIDGET_CONFIG,
} from "@/widgetLibrary/TagsWidget"
import {
  TEXTAREA_EVENT_HANDLER_CONFIG,
  TEXTAREA_PANEL_CONFIG,
  TEXTAREA_WIDGET_CONFIG,
} from "@/widgetLibrary/TextAreaWidget"
import {
  TEXT_EVENT_HANDLER_CONFIG,
  TEXT_PANEL_CONFIG,
  TEXT_WIDGET_CONFIG,
} from "@/widgetLibrary/TextWidget"
import {
  TIME_PICKER_EVENT_HANDLER_CONFIG,
  TIME_PICKER_PANEL_CONFIG,
  TIME_PICKER_WIDGET_CONFIG,
} from "@/widgetLibrary/TimePickerWidget"
import {
  TIME_RANGE_EVENT_HANDLER_CONFIG,
  TIME_RANGE_PANEL_CONFIG,
  TIME_RANGE_WIDGET_CONFIG,
} from "@/widgetLibrary/TimeRangeWidget"
import {
  TIMELINE_EVENT_HANDLER_CONFIG,
  TIMELINE_PANEL_CONFIG,
  TIMELINE_WIDGET_CONFIG,
} from "@/widgetLibrary/TimelineWidget"
import {
  UPLOAD_EVENT_HANDLER_CONFIG,
  UPLOAD_PANEL_CONFIG,
  UPLOAD_WIDGET_CONFIG,
} from "@/widgetLibrary/UploadWidget"
import {
  VIDEO_EVENT_HANDLER_CONFIG,
  VIDEO_PANEL_CONFIG,
  VIDEO_WIDGET_CONFIG,
} from "@/widgetLibrary/VideoWidget"
import {
  AVATAR_EVENT_HANDLER_CONFIG,
  AVATAR_PANEL_CONFIG,
  AVATAR_WIDGET_CONFIG,
} from "./AvatarWidget"
import {
  CODE_SCANNER_EVENT_HANDLER_CONFIG,
  CODE_SCANNER_PANEL_CONFIG,
  CODE_SCANNER_WIDGET_CONFIG,
} from "./CodeScannerWidget"
import {
  GRID_LIST_EVENT_HANDLER_CONFIG,
  GRID_LIST_PANEL_CONFIG,
  GRID_LIST_WIDGET_CONFIG,
} from "./GridListWidget"
import { IFRAME_EVENT_HANDLER_CONFIG } from "./IFrameWidget/eventHandlerConfig"
import {
  QR_CODE_EVENT_HANDLER_CONFIG,
  QR_CODE_PANEL_CONFIG,
  QR_CODE_WIDGET_CONFIG,
} from "./QRCodeWidget"
import {
  SIGNATURE_EVENT_HANDLER_CONFIG,
  SIGNATURE_PANEL_CONFIG,
  SIGNATURE_WIDGET_CONFIG,
} from "./SignatureWidget"
import { EventHandlerConfig, WidgetConfig } from "./interface"

export const WidgetConfigMap: Record<
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
    widget: lazy(() => import("@/widgetLibrary/InputWidget/input")),
  },
  NUMBER_INPUT_WIDGET: {
    config: NUMBER_INPUT_WIDGET_CONFIG,
    panelConfig: NUMBER_INPUT_PANEL_CONFIG,
    eventHandlerConfig: INPUT_NUMBER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/NumberInputWidget/numberInput")),
  },
  EDITABLE_TEXT_WIDGET: {
    config: EDITABLE_TEXT_WIDGET_CONFIG,
    panelConfig: EDITABLE_TEXT_PANEL_CONFIG,
    eventHandlerConfig: EDITABLE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/EditableWidget/editableText")),
  },
  TEXTAREA_INPUT_WIDGET: {
    config: TEXTAREA_WIDGET_CONFIG,
    panelConfig: TEXTAREA_PANEL_CONFIG,
    eventHandlerConfig: TEXTAREA_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TextAreaWidget/textArea")),
  },
  UPLOAD_WIDGET: {
    config: UPLOAD_WIDGET_CONFIG,
    panelConfig: UPLOAD_PANEL_CONFIG,
    eventHandlerConfig: UPLOAD_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/UploadWidget/upload")),
  },
  SLIDER_WIDGET: {
    config: SLIDER_WIDGET_CONFIG,
    panelConfig: SLIDER_PANEL_CONFIG,
    eventHandlerConfig: SLIDER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/SliderWidget/slider")),
  },
  RANGE_SLIDER_WIDGET: {
    config: RANGE_SLIDER_WIDGET_CONFIG,
    panelConfig: RANGE_SLIDER_PANEL_CONFIG,
    eventHandlerConfig: RANGE_SLIDER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/RangeSliderWidget/rangeSlider")),
  },
  RECORDING_WIDGET: {
    config: RECORDING_WIDGET_CONFIG,
    panelConfig: RECORDING_PANEL_CONFIG,
    eventHandlerConfig: RECORDING_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/RecordingWidget/recording")),
  },
  JSON_EDITOR_WIDGET: {
    config: JSON_EDITOR_WIDGET_CONFIG,
    panelConfig: JSON_EDITOR_PANEL_CONFIG,
    eventHandlerConfig: JSON_EDITOR_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/JsonEditorWidget/jsonEditor")),
  },
  RICH_TEXT_WIDGET: {
    widget: lazy(() => import("@/widgetLibrary/RichTextWidget/richText")),
    config: RICH_TEXT_WIDGET_CONFIG,
    panelConfig: RICH_TEXT_PANEL_CONFIG,
    eventHandlerConfig: RICH_TEXT_EVENT_HANDLER_CONFIG,
  },
  JSON_SCHEMA_FORM_WIDGET: {
    widget: lazy(
      () => import("@/widgetLibrary/JsonSchemaFormWidget/jsonSchemaForm"),
    ),
    config: JSON_SCHEMA_FORM_WIDGET_CONFIG,
    panelConfig: JSON_SCHEMA_FORM_PANEL_CONFIG,
    eventHandlerConfig: JSON_SCHEMA_FORM_EVENT_HANDLER_CONFIG,
  },
  SIGNATURE_WIDGET: {
    widget: lazy(() => import("@/widgetLibrary/SignatureWidget/signature")),
    config: SIGNATURE_WIDGET_CONFIG,
    panelConfig: SIGNATURE_PANEL_CONFIG,
    eventHandlerConfig: SIGNATURE_EVENT_HANDLER_CONFIG,
  },
  // select inputs
  SWITCH_WIDGET: {
    config: SWITCH_WIDGET_CONFIG,
    panelConfig: SWITCH_PANEL_CONFIG,
    eventHandlerConfig: SWITCH_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/SwitchWidget/switch")),
  },
  SWITCH_GROUP_WIDGET: {
    config: SWITCH_GROUP_WIDGET_CONFIG,
    panelConfig: SWITCH_GROUP_PANEL_CONFIG,
    eventHandlerConfig: SWITCH_GROUP_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/SwitchGroupWidget/switchGroup")),
  },
  SELECT_WIDGET: {
    config: SELECT_WIDGET_CONFIG,
    panelConfig: SELECT_PANEL_CONFIG,
    eventHandlerConfig: SELECT_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/SelectWidget/select")),
  },
  MULTISELECT_WIDGET: {
    config: MULTISELECT_WIDGET_CONFIG,
    panelConfig: MULTISELECT_PANEL_CONFIG,
    eventHandlerConfig: MULTISELECT_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/MultiselectWidget/multiselect")),
  },
  CHECKBOX_GROUP_WIDGET: {
    config: CHECKBOX_GROUP_WIDGET_CONFIG,
    panelConfig: CHECKBOX_GROUP_PANEL_CONFIG,
    eventHandlerConfig: CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
    widget: lazy(
      () => import("@/widgetLibrary/CheckboxGroupWidget/checkboxGroup"),
    ),
  },
  CASCADER_WIDGET: {
    config: CASCADER_WIDGET_CONFIG,
    panelConfig: CASCADER_PANEL_CONFIG,
    eventHandlerConfig: CASCADER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/CascaderWidget/cascader")),
  },
  RADIO_GROUP_WIDGET: {
    config: RADIO_GROUP_WIDGET_CONFIG,
    panelConfig: RADIO_GROUP_PANEL_CONFIG,
    eventHandlerConfig: RADIO_GROUP_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/RadioGroupWidget/radioGroup")),
  },
  RADIO_BUTTON_WIDGET: {
    config: RADIO_BUTTON_WIDGET_CONFIG,
    panelConfig: RADIO_BUTTON_PANEL_CONFIG,
    eventHandlerConfig: RADIO_BUTTON_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/RadioButtonWidget/radioButton")),
  },
  // calendar inputs
  EVENT_CALENDAR_WIDGET: {
    config: EVENT_CALENDAR_WIDGET_CONFIG,
    panelConfig: EVENT_CALENDAR_PANEL_CONFIG,
    eventHandlerConfig: EVENT_CALENDAR_EVENT_HANDLER_CONFIG,
    widget: lazy(
      () => import("@/widgetLibrary/EventCalendarWidget/eventCalendar"),
    ),
  },
  DATE_WIDGET: {
    config: DATE_WIDGET_CONFIG,
    panelConfig: DATE_PANEL_CONFIG,
    eventHandlerConfig: DATE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/DateWidget/date")),
  },
  DATE_RANGE_WIDGET: {
    config: DATE_RANGE_WIDGET_CONFIG,
    panelConfig: DATE_RANGE_PANEL_CONFIG,
    eventHandlerConfig: DATE_RANGE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/DateRangeWidget/dateRange")),
  },
  DATE_TIME_WIDGET: {
    config: DATE_TIME_WIDGET_CONFIG,
    panelConfig: DATE_TIME_PANEL_CONFIG,
    eventHandlerConfig: DATE_TIME_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/DateTimeWidget/dateTime")),
  },
  // data
  DATA_GRID_WIDGET: {
    config: DATA_GRID_WIDGET_CONFIG,
    panelConfig: DATA_GRID_PANEL_CONFIG,
    eventHandlerConfig: DATA_GRID_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/DataGridWidget/dataGrid")),
  },
  CHART_WIDGET: {
    config: CHART_WIDGET_V2_CONFIG,
    panelConfig: CHART_PANEL_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/ChartWidget/chart")),
  },
  CHART: {
    config: CHART_WIDGET_CONFIG,
    panelConfig: CHART_PANEL_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/ChartWidget/chart")),
  },
  TABLE_WIDGET: {
    config: TABLE_WIDGET_CONFIG,
    panelConfig: TABLE_PANEL_CONFIG,
    eventHandlerConfig: TABLE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TableWidget/table")),
  },
  // container
  CONTAINER_WIDGET: {
    config: CONTAINER_WIDGET_CONFIG,
    panelConfig: CONTAINER_PANEL_CONFIG,
    eventHandlerConfig: CONTAINER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/ContainerWidget/container")),
  },
  FORM_WIDGET: {
    config: FORM_WIDGET_CONFIG,
    panelConfig: FORM_PANEL_CONFIG,
    eventHandlerConfig: FORM_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/FormWidget/form")),
  },
  MODAL_WIDGET: {
    config: MODAL_WIDGET_CONFIG,
    panelConfig: MODAL_PANEL_CONFIG,
    eventHandlerConfig: MODAL_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/ModalWidget/modal")),
  },
  LIST_WIDGET: {
    config: LIST_WIDGET_CONFIG,
    panelConfig: LIST_PANEL_CONFIG,
    eventHandlerConfig: LIST_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/ListWidget/list")),
  },
  GRID_LIST_WIDGET: {
    config: GRID_LIST_WIDGET_CONFIG,
    panelConfig: GRID_LIST_PANEL_CONFIG,
    eventHandlerConfig: GRID_LIST_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/GridListWidget/gridList")),
  },
  // navigation
  MENU_WIDGET: {
    config: MENU_WIDGET_CONFIG,
    panelConfig: MENU_PANEL_CONFIG,
    eventHandlerConfig: MENU_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/MenuWidget/menu")),
  },
  TABS_WIDGET: {
    config: TABS_WIDGET_CONFIG,
    panelConfig: TABS_PANEL_CONFIG,
    eventHandlerConfig: TABS_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TabsWidget/tabs")),
  },
  STEPS_WIDGET: {
    config: STEPS_WIDGET_CONFIG,
    panelConfig: STEPS_PANEL_CONFIG,
    eventHandlerConfig: STEPS_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/StepsWidget/steps")),
  },
  // presentation
  TEXT_WIDGET: {
    config: TEXT_WIDGET_CONFIG,
    panelConfig: TEXT_PANEL_CONFIG,
    eventHandlerConfig: TEXT_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TextWidget/text")),
  },
  IMAGE_WIDGET: {
    config: IMAGE_WIDGET_CONFIG,
    panelConfig: IMAGE_PANEL_CONFIG,
    eventHandlerConfig: IMAGE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/ImageWidget/image")),
  },
  BUTTON_WIDGET: {
    config: BUTTON_WIDGET_CONFIG,
    panelConfig: BUTTON_PANEL_CONFIG,
    eventHandlerConfig: BUTTON_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/ButtonWidget/button")),
  },
  QR_CODE_WIDGET: {
    config: QR_CODE_WIDGET_CONFIG,
    panelConfig: QR_CODE_PANEL_CONFIG,
    eventHandlerConfig: QR_CODE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/QRCodeWidget/qrCode")),
  },
  CODE_SCANNER_WIDGET: {
    config: CODE_SCANNER_WIDGET_CONFIG,
    panelConfig: CODE_SCANNER_PANEL_CONFIG,
    eventHandlerConfig: CODE_SCANNER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/CodeScannerWidget/codeScanner")),
  },
  TAGS_WIDGET: {
    config: TAGS_WIDGET_CONFIG,
    panelConfig: TAGS_PANEL_CONFIG,
    eventHandlerConfig: TAGS_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TagsWidget/tags")),
  },
  CHAT_WIDGET: {
    widget: lazy(() => import("@/widgetLibrary/ChatWidget/chat")),
    config: CHAT_WIDGET_CONFIG,
    panelConfig: CHAT_PANEL_CONFIG,
    eventHandlerConfig: CHAT_EVENT_HANDLER_CONFIG,
  },
  ICON_WIDGET: {
    config: ICON_WIDGET_CONFIG,
    panelConfig: ICON_PANEL_CONFIG,
    eventHandlerConfig: ICON_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/IconWidget/icon")),
  },
  AVATAR_WIDGET: {
    config: AVATAR_WIDGET_CONFIG,
    panelConfig: AVATAR_PANEL_CONFIG,
    eventHandlerConfig: AVATAR_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/AvatarWidget/avatar")),
  },
  STATISTIC_WIDGET: {
    config: STATISTICS_WIDGET_CONFIG,
    panelConfig: STATISTICS_PANEL_CONFIG,
    eventHandlerConfig: STATISTICS_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/StatisticsWidget/statistics")),
  },
  TIME_PICKER_WIDGET: {
    config: TIME_PICKER_WIDGET_CONFIG,
    panelConfig: TIME_PICKER_PANEL_CONFIG,
    eventHandlerConfig: TIME_PICKER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TimePickerWidget/timePicker")),
  },
  TIME_RANGE_WIDGET: {
    config: TIME_RANGE_WIDGET_CONFIG,
    panelConfig: TIME_RANGE_PANEL_CONFIG,
    eventHandlerConfig: TIME_RANGE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TimeRangeWidget/timeRange")),
  },
  RATE_WIDGET: {
    config: RATE_WIDGET_CONFIG,
    panelConfig: RATE_PANEL_CONFIG,
    eventHandlerConfig: RATE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/RateWidget/rate")),
  },
  BAR_PROGRESS_WIDGET: {
    config: BAR_PROGRESS_WIDGET_CONFIG,
    panelConfig: BAR_PROGRESS_PANEL_CONFIG,
    eventHandlerConfig: BAR_PROGRESS_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/BarProgressWidget/barProgress")),
  },
  CIRCLE_PROGRESS_WIDGET: {
    config: CIRCLE_PROGRESS_WIDGET_CONFIG,
    panelConfig: CIRCLE_PROGRESS_PANEL_CONFIG,
    eventHandlerConfig: CIRCLE_PROGRESS_EVENT_HANDLER_CONFIG,
    widget: lazy(
      () => import("@/widgetLibrary/CircleProgressWidget/circleProgress"),
    ),
  },
  TIMELINE_WIDGET: {
    config: TIMELINE_WIDGET_CONFIG,
    panelConfig: TIMELINE_PANEL_CONFIG,
    eventHandlerConfig: TIMELINE_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/TimelineWidget/timeline")),
  },
  DIVIDER_WIDGET: {
    config: DIVIDER_WIDGET_CONFIG,
    panelConfig: DIVIDER_PANEL_CONFIG,
    eventHandlerConfig: DIVIDER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/DividerWidget/divider")),
  },
  PDF_WIDGET: {
    config: PDF_WIDGET_CONFIG,
    panelConfig: PDF_PANEL_CONFIG,
    eventHandlerConfig: PDF_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/PdfWidget/pdf")),
  },
  VIDEO_WIDGET: {
    config: VIDEO_WIDGET_CONFIG,
    panelConfig: VIDEO_PANEL_CONFIG,
    eventHandlerConfig: VIDEO_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/VideoWidget/video")),
  },
  AUDIO_WIDGET: {
    config: AUDIO_WIDGET_CONFIG,
    panelConfig: AUDIO_PANEL_CONFIG,
    eventHandlerConfig: AUDIO_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/AudioWidget/audio")),
  },
  CAROUSEL_WIDGET: {
    config: CAROUSEL_WIDGET_CONFIG,
    panelConfig: CAROUSEL_PANEL_CONFIG,
    eventHandlerConfig: CAROUSEL_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/CarouselWidget/carousel")),
  },
  IFRAME_WIDGET: {
    config: IFRAME_WIDGET_CONFIG,
    panelConfig: IFRAME_PANEL_CONFIG,
    eventHandlerConfig: IFRAME_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/IFrameWidget/iframe")),
  },
}

if (isCloudVersion) {
  WidgetConfigMap["DRIVE_PICKER_WIDGET"] = {
    config: DRIVE_PICKER_WIDGET_CONFIG,
    panelConfig: DRIVE_PICKER_PANEL_CONFIG,
    eventHandlerConfig: DRIVE_PICKER_EVENT_HANDLER_CONFIG,
    widget: lazy(() => import("@/widgetLibrary/DrivePickerWidget/drivePicker")),
  }
  if (import.meta.env.ILLA_GOOGLE_MAP_KEY) {
    WidgetConfigMap["MAP_WIDGET"] = {
      config: MAP_WIDGET_CONFIG,
      panelConfig: MAP_PANEL_CONFIG,
      eventHandlerConfig: MAP_EVENT_HANDLER_CONFIG,
      widget: lazy(() => import("@/widgetLibrary/MapBoxWidget/map")),
    }
  }
}

export type WidgetType = keyof typeof WidgetConfigMap

export const WidgetTypeList = Object.keys(WidgetConfigMap)

export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfigMap[type]
}
