import { PADDING_MODE } from "@illa-public/public-types"
import { v4 } from "uuid"
import FormWidgetIcon from "@/assets/widgetCover/form.svg?react"
import i18n from "@/i18n/config"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { TEXT_WIDGET_CONFIG } from "@/widgetLibrary/TextWidget"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { BUTTON_WIDGET_CONFIG } from "../ButtonWidget"

export const FORM_WIDGET_CONFIG: WidgetConfig = {
  type: "FORM_WIDGET",
  displayName: "form",
  widgetName: i18n.t("widget.form.name"),
  keywords: ["form", "表单"],
  icon: <FormWidgetIcon />,
  sessionType: "CONTAINER",
  w: 16,
  h: 40,
  version: 0,
  childrenNode: [
    {
      ...BasicContainerConfig,
      childrenNode: [
        {
          ...TEXT_WIDGET_CONFIG,
          w: 10,
          h: 5,
          x: 0,
          y: 0,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value: "### Form",
          },
        },
      ],
    },
    BasicContainerConfig,
    {
      ...BasicContainerConfig,
      childrenNode: [
        {
          ...BUTTON_WIDGET_CONFIG,
          w: 8,
          h: 5,
          x: 24,
          y: 0,
          defaults: {
            ...BUTTON_WIDGET_CONFIG.defaults,
            text: "Submit",
            events: [
              {
                actionType: "widget",
                id: v4(),
                eventType: "click",
                widgetID: "form",
                widgetMethod: "submit",
              },
            ],
          },
        },
      ],
    },
  ],
  defaults: {
    showHeader: true,
    showFooter: true,
    validateInputsOnSubmit: true,
    resetAfterSuccessful: true,
    backgroundColor: "#ffffffff",
    radius: "4px",
    shadow: "small",
    headerHeight: 11,
    footerHeight: 7,
    padding: {
      mode: PADDING_MODE.ALL,
      size: "4",
    },
  },
}

export const FORM_BODY_MIN_HEIGHT = 100
export const FORM_MIN_FOOTER_HEIGHT_ROW_NUMBER = 7
export const FORM_MIN_HEADER_HEIGHT_ROW_NUMBER = 7
export const FORM_BODY_MARGIN = 7

export const FORM_CAN_BIND_WIDGET_TYPE = new Map([
  ["INPUT_WIDGET", true],
  ["TEXTAREA_INPUT_WIDGET", true],
  ["NUMBER_INPUT_WIDGET", true],
  ["SELECT_WIDGET", true],
  ["RADIO_BUTTON_WIDGET", true],
  ["RADIO_GROUP_WIDGET", true],
  ["CHECKBOX_GROUP_WIDGET", true],
  ["DATE_RANGE_WIDGET", true],
  ["DATE_TIME_WIDGET", true],
  ["DATE_WIDGET", true],
  ["RATE_WIDGET", true],
  ["FORM_WIDGET", true],
  ["UPLOAD_WIDGET", true],
  ["MULTISELECT_WIDGET", true],
  ["TIME_PICKER_WIDGET", true],
  ["TIME_RANGE_WIDGET", true],
  ["SWITCH_GROUP_WIDGET", true],
  ["RECORDING_WIDGET", true],
  ["EDITABLE_TEXT_WIDGET", true],
  ["SIGNATURE_WIDGET", true],
])
