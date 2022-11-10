import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { MENU_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/MenuWidget/eventHandlerConfig"
import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
  VerticalStartIcon,
} from "@illa-design/icon"

const baseWidgetName = "table"

export const MENU_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-menu`,
    groupName: i18n.t("editor.inspect.setter_group.menu"),
    children: [
      {
        id: `${baseWidgetName}-menuList`,
        useCustomLayout: true,
        attrName: "menuList",
        setterType: "MENU_OPTION_SETTER",
        openDynamic: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-menu-title`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "title",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-menu-icon`,
            labelName: i18n.t("editor.inspect.setter_label.icon"),
            attrName: "icon",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
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
            id: `${baseWidgetName}-menu-format`,
            labelName: i18n.t("editor.inspect.setter_label.format"),
            attrName: "format",
            bindAttrName: ["type"],
            shown: (value) => value === "date",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
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
