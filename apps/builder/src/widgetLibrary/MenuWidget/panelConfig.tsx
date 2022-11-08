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
    id: `${baseWidgetName}-column`,
    groupName: i18n.t("editor.inspect.setter_group.column"),
    children: [
      {
        id: `${baseWidgetName}-basic-menuList`,
        useCustomLayout: true,
        attrName: "menuList",
        setterType: "MENU_OPTION_SETTER",
        openDynamic: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-column-title`,
            labelName: i18n.t("editor.inspect.setter_label.column_title"),
            attrName: "title",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-column-icon`,
            labelName: i18n.t("editor.inspect.setter_label.column_title"),
            attrName: "icon",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-basic-hidden`,
            labelName: i18n.t("editor.inspect.setter_label.hidden"),
            attrName: "hidden",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            openDynamic: true,
            useCustomLayout: true,
          },
          {
            id: `${baseWidgetName}-column-format`,
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
          {
            id: `${baseWidgetName}-basic-enableSorting`,
            labelName: i18n.t("editor.inspect.setter_label.enable_sorting"),
            attrName: "enableSorting",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            openDynamic: true,
            useCustomLayout: true,
          },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
        id: `${baseWidgetName}-layout-layout`,
        labelName: i18n.t("editor.inspect.setter_label.layout"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "tabPosition",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "horizontal",
          },
          {
            label: <VerticalStartIcon />,
            value: "vertical",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-align`,
        labelName: i18n.t("editor.inspect.setter_label.align"),
        attrName: "align",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["tabPosition"],
        shown: (tabPosition) => tabPosition === "horizontal",
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
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-style-color`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-color`,
            labelName: i18n.t("editor.inspect.setter_label.text"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "colorScheme",
            defaultValue: "blue",
          },
        ],
      },
    ],
  },
]
