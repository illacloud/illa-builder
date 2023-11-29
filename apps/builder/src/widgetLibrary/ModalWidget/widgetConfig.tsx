import { v4 } from "uuid"
import ModalWidgetIcon from "@/assets/widgetCover/modal.svg?react"
import i18n from "@/i18n/config"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { BUTTON_WIDGET_CONFIG } from "@/widgetLibrary/ButtonWidget"
import { TEXT_WIDGET_CONFIG } from "@/widgetLibrary/TextWidget"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const MODAL_WIDGET_CONFIG: WidgetConfig = {
  type: "MODAL_WIDGET",
  displayName: "modal",
  widgetName: i18n.t("widget.modal.name"),
  keywords: ["modal", "对话框"],
  icon: <ModalWidgetIcon />,
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
          w: 5,
          h: 5,
          x: 0,
          y: 0,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value: "### Modal",
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
            text: "Confirm",
            events: [
              {
                actionType: "widget",
                id: v4(),
                eventType: "click",
                widgetID: "modal",
                widgetMethod: "closeModal",
              },
            ],
          },
        },
        {
          ...BUTTON_WIDGET_CONFIG,
          w: 8,
          h: 5,
          x: 16,
          y: 0,
          defaults: {
            ...BUTTON_WIDGET_CONFIG.defaults,
            text: "Cancel",
            variant: "outline",
            events: [
              {
                actionType: "widget",
                id: v4(),
                eventType: "click",
                widgetID: "modal",
                widgetMethod: "closeModal",
              },
            ],
          },
        },
      ],
    },
  ],
  defaults: {
    clickMaskClose: false,
    showHeader: true,
    showFooter: true,
    backgroundColor: "#ffffffff",
    radius: "4px",
    shadow: "small",
    headerHeight: 11,
    footerHeight: 7,
  },
}

export const MODAL_BODY_MIN_HEIGHT = 100
export const MODAL_MIN_FOOTER_HEIGHT_ROW_NUMBER = 7
export const MODAL_MIN_HEADER_HEIGHT_ROW_NUMBER = 7
export const MODAL_BODY_MARGIN = 7
