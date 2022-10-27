import { ReactComponent as FormWidgetIcon } from "@/assets/widgetCover/form.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"
import { TEXT_WIDGET_CONFIG } from "@/widgetLibrary/TextWidget"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { BUTTON_WIDGET_CONFIG } from "../ButtonWidget"
import { v4 } from "uuid"

export const FORM_WIDGET_CONFIG: WidgetConfig = {
  type: "FORM_WIDGET",
  displayName: "form",
  widgetName: i18n.t("widget.form.name"),
  keywords: ["form", "表单"],
  icon: <FormWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 20,
  h: 40,
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
          w: 33,
          h: 5,
          x: 31,
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
    borderColor: "#ffffffff",
    backgroundColor: "#ffffffff",
    radius: "4px",
    borderWidth: "4px",
    shadow: "small",
    headerHeight: 7,
    footerHeight: 7,
  },
}

export const FORM_BODY_MIN_HEIGHT = 100
export const FORM_MIN_FOOTER_HEIGHT_ROW_NUMBER = 7
export const FORM_MIN_HEADER_HEIGHT_ROW_NUMBER = 7
export const FORM_BODY_MARGIN = 7

export const FORM_CAN_BIND_WIDGET_TYPE = new Map([
  ["INPUT_WIDGET", true],
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
])
