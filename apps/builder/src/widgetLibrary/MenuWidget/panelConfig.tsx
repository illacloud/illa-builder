import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { MENU_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/MenuWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "menu"

export const MENU_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-menu`,
    groupName: i18n.t("editor.inspect.setter_group.menu"),
    children: [
      {
        id: `${baseWidgetName}-items`,
        useCustomLayout: true,
        attrName: "items",
        setterType: "MENU_OPTION_SETTER",
        openDynamic: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-menu-label`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-menu-value`,
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "value",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-menu-disabled`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disabled",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            openDynamic: true,
            useCustomLayout: true,
          },
          {
            id: `${baseWidgetName}-menu-hidden`,
            labelName: i18n.t("editor.inspect.setter_label.hidden"),
            attrName: "hidden",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            openDynamic: true,
            useCustomLayout: true,
          },
          {
            ...generatorEventHandlerConfig(
              baseWidgetName,
              MENU_EVENT_HANDLER_CONFIG.events,
            ),
          },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-direction`,
        labelName: i18n.t("editor.inspect.setter_label.direction"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.timeline_direction"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "mode",
        options: [
          { label: i18n.t("widget.timeline.vertical"), value: "vertical" },
          {
            label: i18n.t("widget.timeline.horizontal"),
            value: "horizontal",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-align`,
        labelName: i18n.t("editor.inspect.setter_label.align"),
        attrName: "horizontalAlign",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["mode"],
        shown: (mode) => mode === "horizontal",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "flex-start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "flex-end",
          },
        ],
      },
    ],
  },
]
