import RadioIcon from "@/assets/radius-icon.svg?react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { MODAL_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/ModalWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "modal"
export const MODAL_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          MODAL_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-closeOnMaskClick`,
        labelName: i18n.t("editor.inspect.setter.click_mask_close"),
        attrName: "clickMaskClose",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-show-header`,
        labelName: i18n.t("editor.inspect.setter_label.show_header"),
        attrName: "showHeader",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-layout-show-footer`,
        labelName: i18n.t("editor.inspect.setter_label.show_footer"),
        attrName: "showFooter",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-styles`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-styles-border`,
        setterType: "BORDER_SETTER",
        useCustomLayout: true,
        attrName: "border",
      },
      {
        id: `${baseWidgetName}-styles-color`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "border",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-background`,
            labelName: i18n.t("editor.inspect.setter_label.background"),
            attrName: "backgroundColor",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "#ffffffff",
          },
        ],
      },
      {
        id: `${baseWidgetName}-styles-style`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.style"),
        attrName: "style",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-radius`,
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            attrName: "radius",
            setterType: "MEASURE_CHECK_INPUT_SETTER",
            useCustomLayout: true,
            icon: <RadioIcon />,
            defaultValue: "4px",
          },
        ],
      },
    ],
  },
]
