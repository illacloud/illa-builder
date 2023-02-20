import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { LIST_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/ListWidget/eventHandlerConfig"
import { OVERFLOW_TYPE } from "@/widgetLibrary/ListWidget/interface"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "list"
export const LIST_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-data-source`,
        labelName: i18n.t("editor.inspect.setter_label.data_source"),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.ARRAY,
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          LIST_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-height`,
        labelName: i18n.t("editor.inspect.setter_label.height"),
        attrName: "dynamicHeight",
        setterType: "HEIGHT_MODE_SELECT",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.fixed"),
            value: "fixed",
          },
          // {
          //   label: i18n.t("editor.inspect.setter_option.auto_limited"),
          //   value: "limited",
          // },
          {
            label: i18n.t("editor.inspect.setter_option.auto_height"),
            value: "auto",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-overFlow`,
        labelName: i18n.t("editor.inspect.setter_label.overFlow"),
        attrName: "overflowMethod",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["dynamicHeight"],
        shown: (dynamicHeight: string) => dynamicHeight !== "auto",
        options: [
          {
            label: i18n.t("widget.table.pagination"),
            value: OVERFLOW_TYPE.PAGINATION,
          },
          { label: i18n.t("widget.table.scroll"), value: OVERFLOW_TYPE.SCROLL },
        ],
      },
      {
        id: `${baseWidgetName}-basic-pageSize`,
        labelName: i18n.t("editor.inspect.setter_label.pageSize"),
        attrName: "pageSize",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
        bindAttrName: ["overflowMethod", "dynamicHeight"],
        shown: (overflow: string, dynamicHeight: string) =>
          overflow === OVERFLOW_TYPE.PAGINATION && dynamicHeight !== "auto",
      },
      {
        id: `${baseWidgetName}-layout-hidden`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        useCustomLayout: true,
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
            labelName: i18n.t(
              "editor.inspect.setter_label.item_background_color",
            ),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "itemBackGroundColor",
            defaultValue: "white",
          },
          {
            id: `${baseWidgetName}-style-background-color`,
            labelName: i18n.t("editor.inspect.setter_label.background_color"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "backgroundColor",
            defaultValue: "white",
          },
        ],
      },
    ],
  },
]
