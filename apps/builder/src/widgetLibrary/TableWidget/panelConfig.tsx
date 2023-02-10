import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { generatorTableEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorTableEventHandlerConfig"
import {
  TABLE_BUTTON_EVENT_HANDLER_CONFIG,
  TABLE_EVENT_HANDLER_CONFIG,
} from "@/widgetLibrary/TableWidget/eventHandlerConfig"
import { ColumnTypeOption } from "@/widgetLibrary/TableWidget/interface"

const baseWidgetName = "table"

export const TABLE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-data-source`,
        labelName: i18n.t("editor.inspect.setter_label.data_source"),
        useCustomLayout: true,
        attrName: "dataSource",
        setterType: "TABLE_DATASOURCE_SELECT_SETTER",
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
        openDynamic: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-column-header`,
            labelName: i18n.t("editor.inspect.setter_label.column_title"),
            attrName: "header",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-column-type`,
            labelName: i18n.t("editor.inspect.setter_label.column_type"),
            attrName: "type",
            setterType: "BASE_SELECT_SETTER",
            options: ColumnTypeOption,
          },
          {
            id: `${baseWidgetName}-column-decimalPlaces`,
            labelName: i18n.t("editor.inspect.setter_label.decimal_places"),
            attrName: "decimalPlaces",
            bindAttrName: ["type"],
            shown: (value) => value === "number" || value === "percent",
            placeholder: "{{ 0 }}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.NUMBER,
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
            id: `${baseWidgetName}-column-mappedValue`,
            labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
            labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
            attrName: "mappedValue",
            setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
            placeholder: "{{currentRow.col}}",
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
          {
            bindAttrName: ["type"],
            shown: (value) => value === "button",
            ...generatorTableEventHandlerConfig(
              baseWidgetName,
              TABLE_BUTTON_EVENT_HANDLER_CONFIG.events,
            ),
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
        bindAttrName: ["defaultSortKey"],
        shown: (value) => value !== "default",
        options: [
          { label: i18n.t("widget.table.ascend"), value: "ascend" },
          { label: i18n.t("widget.table.descend"), value: "descend" },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-rowSelection`,
    groupName: i18n.t("editor.inspect.setter_group.row_selection"),
    children: [
      {
        id: `${baseWidgetName}-basic-multiRowSelection`,
        labelName: i18n.t("editor.inspect.setter_label.multi_row_selection"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.multi_row_selection"),
        attrName: "multiRowSelection",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-PAGINATION`,
    groupName: i18n.t("editor.inspect.setter_group.pagination"),
    children: [
      {
        id: `${baseWidgetName}-basic-overFlow`,
        labelName: i18n.t("editor.inspect.setter_label.overFlow"),
        attrName: "overFlow",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: i18n.t("widget.table.pagination"), value: "pagination" },
          { label: i18n.t("widget.table.scroll"), value: "scroll" },
        ],
      },
      {
        id: `${baseWidgetName}-basic-pageSize`,
        labelName: i18n.t("editor.inspect.setter_label.pageSize"),
        attrName: "pageSize",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: `${baseWidgetName}-toolbar`,
    groupName: i18n.t("editor.inspect.setter_group.toolbar"),
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
      {
        id: `${baseWidgetName}-basic-filter`,
        labelName: i18n.t("editor.inspect.setter_label.filter"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.filter"),
        attrName: "filter",
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
          TABLE_EVENT_HANDLER_CONFIG.events,
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
