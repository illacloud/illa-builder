import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { SWITCH_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/SwitchWidget"

const baseWidgetName = "table"
export const TABLE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-basic-data`,
        labelName: i18n.t("editor.inspect.setter_label.data"),
        attrName: "data",
        isSetterSingleRow: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-emptyState`,
        labelName: i18n.t("editor.inspect.setter_label.empty_state"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.placeholder"),
        attrName: "emptyState",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-basic-loading`,
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.loading"),
        attrName: "loading",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-column`,
    groupName: i18n.t("editor.inspect.setter_group.column"),
    children: [
      {
        id: `${baseWidgetName}-basic-columns`,
        useCustomLayout: true,
        attrName: "columns",
        setterType: "COLUMN_SETTER",
        childrenSetter: [
          {
            id: `${baseWidgetName}-options-label`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-value`,
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "value",
            setterType: "INPUT_SETTER",
          },
          {
            id: `${baseWidgetName}-options-disabled`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disabled",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-sort`,
    groupName: i18n.t("editor.inspect.setter_group.sort"),
    children: [
      {
        id: `${baseWidgetName}-basic-defaultSortKey`,
        labelName: i18n.t("editor.inspect.setter_label.default_sort_key"),
        attrName: "defaultSortKey",
        setterType: "COLUMNS_SELECT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-basic-defaultSortOrder`,
        labelName: i18n.t("editor.inspect.setter_label.default_sort_order"),
        attrName: "defaultSortOrder",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: i18n.t("widget.table.ascend"), value: "ascend" },
          { label: i18n.t("widget.table.descend"), value: "descend" },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-toolbar`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-basic-download`,
        labelName: i18n.t("editor.inspect.setter_label.download"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.download"),
        attrName: "download",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
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
          SWITCH_EVENT_HANDLER_CONFIG.events,
        ),
      },
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
]
