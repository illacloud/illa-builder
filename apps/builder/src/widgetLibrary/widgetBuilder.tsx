import {
  BAR_PROGRESS_EVENT_HANDLER_CONFIG,
  BAR_PROGRESS_PANEL_CONFIG,
  BAR_PROGRESS_WIDGET_CONFIG,
  BarProgressWidget,
} from "@/widgetLibrary/BarProgressWidget"
import {
  BUTTON_EVENT_HANDLER_CONFIG,
  BUTTON_PANEL_CONFIG,
  BUTTON_WIDGET_CONFIG,
  ButtonWidget,
} from "@/widgetLibrary/ButtonWidget"
import {
  CAROUSEL_EVENT_HANDLER_CONFIG,
  CAROUSEL_PANEL_CONFIG,
  CAROUSEL_WIDGET_CONFIG,
  CarouselWidget,
} from "@/widgetLibrary/CarouselWidget"
import {
  CASCADER_PANEL_CONFIG,
  CASCADER_WIDGET_CONFIG,
  CascaderWidget,
} from "@/widgetLibrary/CascaderWidget"
import { CASCADER_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/CascaderWidget/eventHandlerConfig"
import {
  CHART_PANEL_CONFIG,
  CHART_WIDGET_CONFIG,
  ChartWidget,
} from "@/widgetLibrary/Chart"
import {
  CHECKBOX_GROUP_PANEL_CONFIG,
  CHECKBOX_GROUP_WIDGET_CONFIG,
  CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
  CheckboxWidget,
} from "@/widgetLibrary/CheckboxGroupWidget"
import {
  CIRCLE_PROGRESS_EVENT_HANDLER_CONFIG,
  CIRCLE_PROGRESS_PANEL_CONFIG,
  CIRCLE_PROGRESS_WIDGET_CONFIG,
  CircleProgressWidget,
} from "@/widgetLibrary/CircleProgressWidget"
import {
  CONTAINER_EVENT_HANDLER_CONFIG,
  CONTAINER_PANEL_CONFIG,
  CONTAINER_WIDGET_CONFIG,
  ContainerWidget,
} from "@/widgetLibrary/ContainerWidget"
import {
  DATE_RANGE_EVENT_HANDLER_CONFIG,
  DATE_RANGE_PANEL_CONFIG,
  DATE_RANGE_WIDGET_CONFIG,
  DateRangeWidget,
} from "@/widgetLibrary/DateRangeWidget"
import {
  DATE_TIME_EVENT_HANDLER_CONFIG,
  DATE_TIME_PANEL_CONFIG,
  DATE_TIME_WIDGET_CONFIG,
  DateTimeWidget,
} from "@/widgetLibrary/DateTimeWidget"
import {
  DATE_EVENT_HANDLER_CONFIG,
  DATE_PANEL_CONFIG,
  DATE_WIDGET_CONFIG,
  DateWidget,
} from "@/widgetLibrary/DateWidget"
import {
  DIVIDER_EVENT_HANDLER_CONFIG,
  DIVIDER_PANEL_CONFIG,
  DIVIDER_WIDGET_CONFIG,
  DividerWidget,
} from "@/widgetLibrary/DividerWidget"
import {
  EDITABLE_EVENT_HANDLER_CONFIG,
  EDITABLE_TEXT_PANEL_CONFIG,
  EDITABLE_TEXT_WIDGET_CONFIG,
  EditableTextWidget,
} from "@/widgetLibrary/EditableWidget"
import {
  FORM_EVENT_HANDLER_CONFIG,
  FORM_PANEL_CONFIG,
  FORM_WIDGET_CONFIG,
  FormWidget,
} from "@/widgetLibrary/FormWidget"
import {
  ICON_EVENT_HANDLER_CONFIG,
  ICON_PANEL_CONFIG,
  ICON_WIDGET_CONFIG,
  IconWidget,
} from "@/widgetLibrary/IconWidget"
import {
  IMAGE_EVENT_HANDLER_CONFIG,
  IMAGE_PANEL_CONFIG,
  IMAGE_WIDGET_CONFIG,
  ImageWidget,
} from "@/widgetLibrary/ImageWidget"
import {
  INPUT_EVENT_HANDLER_CONFIG,
  INPUT_PANEL_CONFIG,
  INPUT_WIDGET_CONFIG,
  InputWidget,
} from "@/widgetLibrary/InputWidget"
import {
  LIST_EVENT_HANDLER_CONFIG,
  LIST_PANEL_CONFIG,
  LIST_WIDGET_CONFIG,
  ListWidget,
} from "@/widgetLibrary/ListWidget"
import {
  MENU_EVENT_HANDLER_CONFIG,
  MENU_PANEL_CONFIG,
  MENU_WIDGET_CONFIG,
  MenuWidget,
} from "@/widgetLibrary/MenuWidget"
import {
  MODAL_EVENT_HANDLER_CONFIG,
  MODAL_PANEL_CONFIG,
  MODAL_WIDGET_CONFIG,
  ModalWidget,
} from "@/widgetLibrary/ModalWidget"
import {
  INPUT_NUMBER_EVENT_HANDLER_CONFIG,
  NUMBER_INPUT_PANEL_CONFIG,
  NUMBER_INPUT_WIDGET_CONFIG,
  NumberInputWidget,
} from "@/widgetLibrary/NumberInputWidget"
import {
  PDF_EVENT_HANDLER_CONFIG,
  PDF_PANEL_CONFIG,
  PDF_WIDGET_CONFIG,
  PdfWidget,
} from "@/widgetLibrary/PdfWidget"
import {
  RADIO_BUTTON_EVENT_HANDLER_CONFIG,
  RADIO_BUTTON_PANEL_CONFIG,
  RADIO_BUTTON_WIDGET_CONFIG,
  RadioButtonWidget,
} from "@/widgetLibrary/RadioButtonWidget"
import {
  RADIO_GROUP_EVENT_HANDLER_CONFIG,
  RADIO_GROUP_PANEL_CONFIG,
  RADIO_GROUP_WIDGET_CONFIG,
  RadioGroupWidget,
} from "@/widgetLibrary/RadioGroupWidget"
import {
  RATE_EVENT_HANDLER_CONFIG,
  RATE_PANEL_CONFIG,
  RATE_WIDGET_CONFIG,
  RateWidget,
} from "@/widgetLibrary/RateWidget"
import {
  SELECT_EVENT_HANDLER_CONFIG,
  SELECT_PANEL_CONFIG,
  SELECT_WIDGET_CONFIG,
  SelectWidget,
} from "@/widgetLibrary/SelectWidget"
import {
  STATISTICS_EVENT_HANDLER_CONFIG,
  STATISTICS_PANEL_CONFIG,
  STATISTICS_WIDGET_CONFIG,
  StatisticWidget,
} from "@/widgetLibrary/StatisticsWidget"
import {
  SWITCH_EVENT_HANDLER_CONFIG,
  SWITCH_PANEL_CONFIG,
  SWITCH_WIDGET_CONFIG,
  SwitchWidget,
} from "@/widgetLibrary/SwitchWidget"
import {
  TABLE_EVENT_HANDLER_CONFIG,
  TABLE_PANEL_CONFIG,
  TABLE_WIDGET_CONFIG,
  TableWidget,
} from "@/widgetLibrary/TableWidget"
import {
  TABS_EVENT_HANDLER_CONFIG,
  TABS_PANEL_CONFIG,
  TABS_WIDGET_CONFIG,
  TabsWidget,
} from "@/widgetLibrary/TabsWidget"
import {
  TEXTAREA_EVENT_HANDLER_CONFIG,
  TEXTAREA_PANEL_CONFIG,
  TEXTAREA_WIDGET_CONFIG,
  TextareaWidget,
} from "@/widgetLibrary/TextAreaWidget"
import {
  TEXT_EVENT_HANDLER_CONFIG,
  TEXT_PANEL_CONFIG,
  TEXT_WIDGET_CONFIG,
  TextWidget,
} from "@/widgetLibrary/TextWidget"
import {
  TIMELINE_EVENT_HANDLER_CONFIG,
  TIMELINE_PANEL_CONFIG,
  TIMELINE_WIDGET_CONFIG,
  TimelineWidget,
} from "@/widgetLibrary/TimelineWidget"
import {
  UPLOAD_EVENT_HANDLER_CONFIG,
  UPLOAD_PANEL_CONFIG,
  UPLOAD_WIDGET_CONFIG,
  UploadWidget,
} from "@/widgetLibrary/UploadWidget"
import {
  VIDEO_EVENT_HANDLER_CONFIG,
  VIDEO_PANEL_CONFIG,
  VIDEO_WIDGET_CONFIG,
  VideoWidget,
} from "@/widgetLibrary/VideoWidget"
import { WidgetConfigs } from "./interface"

export const WidgetConfig: WidgetConfigs = {
  TEXT_WIDGET: {
    widget: TextWidget,
    config: TEXT_WIDGET_CONFIG,
    panelConfig: TEXT_PANEL_CONFIG,
    eventHandlerConfig: TEXT_EVENT_HANDLER_CONFIG,
  },
  IMAGE_WIDGET: {
    widget: ImageWidget,
    config: IMAGE_WIDGET_CONFIG,
    panelConfig: IMAGE_PANEL_CONFIG,
    eventHandlerConfig: IMAGE_EVENT_HANDLER_CONFIG,
  },
  SWITCH_WIDGET: {
    widget: SwitchWidget,
    config: SWITCH_WIDGET_CONFIG,
    panelConfig: SWITCH_PANEL_CONFIG,
    eventHandlerConfig: SWITCH_EVENT_HANDLER_CONFIG,
  },
  BUTTON_WIDGET: {
    widget: ButtonWidget,
    config: BUTTON_WIDGET_CONFIG,
    panelConfig: BUTTON_PANEL_CONFIG,
    eventHandlerConfig: BUTTON_EVENT_HANDLER_CONFIG,
  },
  SELECT_WIDGET: {
    widget: SelectWidget,
    config: SELECT_WIDGET_CONFIG,
    panelConfig: SELECT_PANEL_CONFIG,
    eventHandlerConfig: SELECT_EVENT_HANDLER_CONFIG,
  },
  RADIO_GROUP_WIDGET: {
    widget: RadioGroupWidget,
    config: RADIO_GROUP_WIDGET_CONFIG,
    panelConfig: RADIO_GROUP_PANEL_CONFIG,
    eventHandlerConfig: RADIO_GROUP_EVENT_HANDLER_CONFIG,
  },
  INPUT_WIDGET: {
    widget: InputWidget,
    config: INPUT_WIDGET_CONFIG,
    panelConfig: INPUT_PANEL_CONFIG,
    eventHandlerConfig: INPUT_EVENT_HANDLER_CONFIG,
  },
  ICON_WIDGET: {
    widget: IconWidget,
    config: ICON_WIDGET_CONFIG,
    panelConfig: ICON_PANEL_CONFIG,
    eventHandlerConfig: ICON_EVENT_HANDLER_CONFIG,
  },
  STATISTIC_WIDGET: {
    widget: StatisticWidget,
    config: STATISTICS_WIDGET_CONFIG,
    panelConfig: STATISTICS_PANEL_CONFIG,
    eventHandlerConfig: STATISTICS_EVENT_HANDLER_CONFIG,
  },
  DATE_WIDGET: {
    widget: DateWidget,
    config: DATE_WIDGET_CONFIG,
    panelConfig: DATE_PANEL_CONFIG,
    eventHandlerConfig: DATE_EVENT_HANDLER_CONFIG,
  },
  DATE_RANGE_WIDGET: {
    widget: DateRangeWidget,
    config: DATE_RANGE_WIDGET_CONFIG,
    panelConfig: DATE_RANGE_PANEL_CONFIG,
    eventHandlerConfig: DATE_RANGE_EVENT_HANDLER_CONFIG,
  },
  DATE_TIME_WIDGET: {
    widget: DateTimeWidget,
    config: DATE_TIME_WIDGET_CONFIG,
    panelConfig: DATE_TIME_PANEL_CONFIG,
    eventHandlerConfig: DATE_TIME_EVENT_HANDLER_CONFIG,
  },
  RATE_WIDGET: {
    widget: RateWidget,
    config: RATE_WIDGET_CONFIG,
    panelConfig: RATE_PANEL_CONFIG,
    eventHandlerConfig: RATE_EVENT_HANDLER_CONFIG,
  },
  BAR_PROGRESS_WIDGET: {
    widget: BarProgressWidget,
    config: BAR_PROGRESS_WIDGET_CONFIG,
    panelConfig: BAR_PROGRESS_PANEL_CONFIG,
    eventHandlerConfig: BAR_PROGRESS_EVENT_HANDLER_CONFIG,
  },
  CIRCLE_PROGRESS_WIDGET: {
    widget: CircleProgressWidget,
    config: CIRCLE_PROGRESS_WIDGET_CONFIG,
    panelConfig: CIRCLE_PROGRESS_PANEL_CONFIG,
    eventHandlerConfig: CIRCLE_PROGRESS_EVENT_HANDLER_CONFIG,
  },
  TIMELINE_WIDGET: {
    widget: TimelineWidget,
    config: TIMELINE_WIDGET_CONFIG,
    panelConfig: TIMELINE_PANEL_CONFIG,
    eventHandlerConfig: TIMELINE_EVENT_HANDLER_CONFIG,
  },
  NUMBER_INPUT_WIDGET: {
    widget: NumberInputWidget,
    config: NUMBER_INPUT_WIDGET_CONFIG,
    panelConfig: NUMBER_INPUT_PANEL_CONFIG,
    eventHandlerConfig: INPUT_NUMBER_EVENT_HANDLER_CONFIG,
  },
  CHECKBOX_GROUP_WIDGET: {
    widget: CheckboxWidget,
    config: CHECKBOX_GROUP_WIDGET_CONFIG,
    panelConfig: CHECKBOX_GROUP_PANEL_CONFIG,
    eventHandlerConfig: CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
  },
  RADIO_BUTTON_WIDGET: {
    widget: RadioButtonWidget,
    config: RADIO_BUTTON_WIDGET_CONFIG,
    panelConfig: RADIO_BUTTON_PANEL_CONFIG,
    eventHandlerConfig: RADIO_BUTTON_EVENT_HANDLER_CONFIG,
  },
  DIVIDER_WIDGET: {
    widget: DividerWidget,
    config: DIVIDER_WIDGET_CONFIG,
    panelConfig: DIVIDER_PANEL_CONFIG,
    eventHandlerConfig: DIVIDER_EVENT_HANDLER_CONFIG,
  },
  EDITABLE_TEXT_WIDGET: {
    widget: EditableTextWidget,
    config: EDITABLE_TEXT_WIDGET_CONFIG,
    panelConfig: EDITABLE_TEXT_PANEL_CONFIG,
    eventHandlerConfig: EDITABLE_EVENT_HANDLER_CONFIG,
  },
  TEXTAREA_INPUT_WIDGET: {
    widget: TextareaWidget,
    config: TEXTAREA_WIDGET_CONFIG,
    panelConfig: TEXTAREA_PANEL_CONFIG,
    eventHandlerConfig: TEXTAREA_EVENT_HANDLER_CONFIG,
  },
  UPLOAD_WIDGET: {
    widget: UploadWidget,
    config: UPLOAD_WIDGET_CONFIG,
    panelConfig: UPLOAD_PANEL_CONFIG,
    eventHandlerConfig: UPLOAD_EVENT_HANDLER_CONFIG,
  },
  CHART: {
    widget: ChartWidget,
    config: CHART_WIDGET_CONFIG,
    panelConfig: CHART_PANEL_CONFIG,
  },
  TABLE_WIDGET: {
    widget: TableWidget,
    config: TABLE_WIDGET_CONFIG,
    panelConfig: TABLE_PANEL_CONFIG,
    eventHandlerConfig: TABLE_EVENT_HANDLER_CONFIG,
  },
  TABS_WIDGET: {
    widget: TabsWidget,
    config: TABS_WIDGET_CONFIG,
    panelConfig: TABS_PANEL_CONFIG,
    eventHandlerConfig: TABS_EVENT_HANDLER_CONFIG,
  },
  MENU_WIDGET: {
    widget: MenuWidget,
    config: MENU_WIDGET_CONFIG,
    panelConfig: MENU_PANEL_CONFIG,
    eventHandlerConfig: MENU_EVENT_HANDLER_CONFIG,
  },
  CONTAINER_WIDGET: {
    widget: ContainerWidget,
    config: CONTAINER_WIDGET_CONFIG,
    panelConfig: CONTAINER_PANEL_CONFIG,
    eventHandlerConfig: CONTAINER_EVENT_HANDLER_CONFIG,
  },
  FORM_WIDGET: {
    widget: FormWidget,
    config: FORM_WIDGET_CONFIG,
    panelConfig: FORM_PANEL_CONFIG,
    eventHandlerConfig: FORM_EVENT_HANDLER_CONFIG,
  },
  LIST_WIDGET: {
    widget: ListWidget,
    config: LIST_WIDGET_CONFIG,
    panelConfig: LIST_PANEL_CONFIG,
    eventHandlerConfig: LIST_EVENT_HANDLER_CONFIG,
  },
  CASCADER_WIDGET: {
    widget: CascaderWidget,
    config: CASCADER_WIDGET_CONFIG,
    panelConfig: CASCADER_PANEL_CONFIG,
    eventHandlerConfig: CASCADER_EVENT_HANDLER_CONFIG,
  },
  MODAL_WIDGET: {
    widget: ModalWidget,
    config: MODAL_WIDGET_CONFIG,
    panelConfig: MODAL_PANEL_CONFIG,
    eventHandlerConfig: MODAL_EVENT_HANDLER_CONFIG,
  },
  PDF_WIDGET: {
    widget: PdfWidget,
    config: PDF_WIDGET_CONFIG,
    panelConfig: PDF_PANEL_CONFIG,
    eventHandlerConfig: PDF_EVENT_HANDLER_CONFIG,
  },
  VIDEO_WIDGET: {
    widget: VideoWidget,
    config: VIDEO_WIDGET_CONFIG,
    panelConfig: VIDEO_PANEL_CONFIG,
    eventHandlerConfig: VIDEO_EVENT_HANDLER_CONFIG,
  },
  CAROUSEL_WIDGET: {
    widget: CarouselWidget,
    config: CAROUSEL_WIDGET_CONFIG,
    panelConfig: CAROUSEL_PANEL_CONFIG,
    eventHandlerConfig: CAROUSEL_EVENT_HANDLER_CONFIG,
  },
}

export type WidgetType = keyof typeof WidgetConfig

export const WidgetTypeList = Object.keys(WidgetConfig)

export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfig[type]
}
