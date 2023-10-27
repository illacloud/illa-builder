import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import i18n from "@/i18n/config"
import { ColumnType } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSetter/interface"
import {
  PanelConfig,
  PanelFieldConfig,
} from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  DATA_GRID_BUTTON_EVENT_HANDLER_CONFIG,
  DATA_GRID_EVENT_HANDLER_CONFIG,
} from "@/widgetLibrary/DataGridWidget/eventHandlerConfig"
import { ColumnTypeList } from "@/widgetLibrary/DataGridWidget/interface"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "dataGrid"

export function getColumnsTypeSetter(type: ColumnType): PanelFieldConfig[] {
  return [
    ...DATA_GRID_COMMON_COLUMN_SETTER_CONFIG.slice(0, 3),
    ...getColumnsTypeSubSetter(type),
    ...DATA_GRID_COMMON_COLUMN_SETTER_CONFIG.slice(
      4,
      DATA_GRID_COMMON_COLUMN_SETTER_CONFIG.length,
    ),
  ]
}

export function getColumnsTypeSubSetter(type: ColumnType): PanelFieldConfig[] {
  switch (type) {
    case "auto":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
      ]
    case "text":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
      ]
    case "date":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-format`,
          labelName: i18n.t("editor.inspect.setter_label.format"),
          attrName: "format",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          defaultValue: "YYYY-MM-DD",
          expectedType: VALIDATION_TYPES.STRING,
        },
      ]
    case "tag":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-tagColor`,
          labelName: i18n.t("editor.inspect.setter_label.table.tag_color"),
          labelDesc: i18n.t("editor.inspect.setter_tips.table.tag_color"),
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          attrName: "tagColor",
        },
      ]
    case "datetime":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-format`,
          labelName: i18n.t("editor.inspect.setter_label.format"),
          attrName: "format",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          defaultValue: "YYYY-MM-DD HH:mm:ss",
          expectedType: VALIDATION_TYPES.STRING,
        },
      ]
    case "number":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-decimalPlaces`,
          labelName: i18n.t("editor.inspect.setter_label.decimal_places"),
          attrName: "decimalPlaces",
          placeholder: "{{ 0 }}",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.NUMBER,
        },
        {
          id: `${baseWidgetName}-column-showThousandsSeparator`,
          labelName: i18n.t(
            "editor.inspect.setter_label.table.show_thousands_separ",
          ),
          labelDesc: i18n.t(
            "editor.inspect.setter_tips.table.show_thousands_separ",
          ),
          attrName: "showThousandsSeparator",
          setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
          expectedType: VALIDATION_TYPES.BOOLEAN,
          openDynamic: true,
          useCustomLayout: true,
        },
        {
          id: `${baseWidgetName}-column-locale`,
          labelName: i18n.t("editor.inspect.setter_label.table.locale"),
          labelDesc: i18n.t("editor.inspect.setter_tips.table.locale"),
          attrName: "locale",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.STRING,
          openDynamic: true,
          useCustomLayout: true,
        },
      ]
    case "percent":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-decimalPlaces`,
          labelName: i18n.t("editor.inspect.setter_label.decimal_places"),
          attrName: "decimalPlaces",
          placeholder: "{{ 0 }}",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.NUMBER,
        },
        {
          id: `${baseWidgetName}-column-showThousandsSeparator`,
          labelName: i18n.t(
            "editor.inspect.setter_label.table.show_thousands_separ",
          ),
          labelDesc: i18n.t(
            "editor.inspect.setter_tips.table.show_thousands_separ",
          ),
          attrName: "showThousandsSeparator",
          setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
          expectedType: VALIDATION_TYPES.BOOLEAN,
          openDynamic: true,
          useCustomLayout: true,
        },
        {
          id: `${baseWidgetName}-column-locale`,
          labelName: i18n.t("editor.inspect.setter_label.table.locale"),
          labelDesc: i18n.t("editor.inspect.setter_tips.table.locale"),
          attrName: "locale",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.STRING,
          bindAttrName: ["showThousandsSeparator"],
          shown: (value) => value,
          openDynamic: true,
          useCustomLayout: true,
        },
      ]
    case "html":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
      ]
    case "link":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
      ]
    case "button":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          ...generatorEventHandlerConfig(
            baseWidgetName,
            DATA_GRID_BUTTON_EVENT_HANDLER_CONFIG.events,
          ),
        },
        {
          id: `${baseWidgetName}-column-disabled`,
          labelName: i18n.t("editor.inspect.setter_label.disabled"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
          placeholder: "{{false}}",
          attrName: "disabled",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.BOOLEAN,
        },
        {
          id: `${baseWidgetName}-column-colorScheme`,
          labelName: i18n.t("editor.inspect.setter_label.theme_color"),
          setterType: "COLOR_PICKER_SETTER",
          labelSize: "medium",
          attrName: "colorScheme",
          defaultValue: "blue",
        },
      ]
    case "buttongroup":
      return [
        {
          id: `${baseWidgetName}-column-buttonGroup`,
          attrName: "buttonGroup",
          setterType: "DATA_GRID_COLUMN_BUTTON_GROUP_SETTER",
          openDynamic: true,
          useCustomLayout: true,
          childrenSetter: [
            {
              id: `${baseWidgetName}-column-mappedValue`,
              labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
              labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
              attrName: "mappedValue",
              setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
              placeholder: "{{currentRow}}",
            },
            {
              ...generatorEventHandlerConfig(
                baseWidgetName,
                DATA_GRID_BUTTON_EVENT_HANDLER_CONFIG.events,
              ),
            },
            {
              id: `${baseWidgetName}-column-disabled`,
              labelName: i18n.t("editor.inspect.setter_label.disabled"),
              labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
              placeholder: "{{false}}",
              attrName: "disabled",
              setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
              expectedType: VALIDATION_TYPES.BOOLEAN,
            },
            {
              id: `${baseWidgetName}-column-colorScheme`,
              labelName: i18n.t("editor.inspect.setter_label.theme_color"),
              setterType: "COLOR_PICKER_SETTER",
              labelSize: "medium",
              attrName: "colorScheme",
              defaultValue: "blue",
            },
          ],
        },
      ]
    case "boolean":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
      ]
    case "image":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-scaleType`,
          labelName: i18n.t("editor.inspect.setter_label.scale_type"),
          attrName: "objectFit",
          defaultValue: "scale-down",
          setterType: "SEARCH_SELECT_SETTER",
          options: ["container", "cover", "fill", "none", "scale-down"],
        },
      ]
    case "rating":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-maxCount`,
          labelName: i18n.t("editor.inspect.setter_label.max_count"),
          attrName: "maxCount",
          placeholder: "{{ 5 }}",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.NUMBER,
        },
      ]
    case "markdown":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
      ]
    case "currency":
      return [
        {
          id: `${baseWidgetName}-column-mappedValue`,
          labelName: i18n.t("editor.inspect.setter_label.mapped_value"),
          labelDesc: i18n.t("editor.inspect.setter_tooltip.mapped_value"),
          attrName: "mappedValue",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          placeholder: "{{currentRow}}",
        },
        {
          id: `${baseWidgetName}-column-currencyCode`,
          labelName: i18n.t("editor.inspect.setter_label.table.currency_code"),
          labelDesc: i18n.t("editor.inspect.setter_tips.table.currency_code"),
          placeholder: i18n.t(
            "editor.inspect.setter_placeholder.table.currency_code",
          ),
          attrName: "currencyCode",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          id: `${baseWidgetName}-column-decimalPlaces`,
          labelName: i18n.t("editor.inspect.setter_label.decimal_places"),
          attrName: "decimalPlaces",
          placeholder: "{{ 0 }}",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.NUMBER,
        },
        {
          id: `${baseWidgetName}-column-showThousandsSeparator`,
          labelName: i18n.t(
            "editor.inspect.setter_label.table.show_thousands_separ",
          ),
          labelDesc: i18n.t(
            "editor.inspect.setter_tips.table.show_thousands_separ",
          ),
          attrName: "showThousandsSeparator",
          setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
          expectedType: VALIDATION_TYPES.BOOLEAN,
          openDynamic: true,
          useCustomLayout: true,
        },
        {
          id: `${baseWidgetName}-column-locale`,
          labelName: i18n.t("editor.inspect.setter_label.table.locale"),
          labelDesc: i18n.t("editor.inspect.setter_tips.table.locale"),
          attrName: "locale",
          setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
          expectedType: VALIDATION_TYPES.STRING,
          bindAttrName: ["showThousandsSeparator"],
          shown: (value) => value,
          openDynamic: true,
          useCustomLayout: true,
        },
      ]
    default:
      return []
  }
}

export const DATA_GRID_COMMON_COLUMN_SETTER_CONFIG: PanelFieldConfig[] = [
  {
    id: `${baseWidgetName}-column-headerName`,
    labelName: i18n.t("editor.inspect.setter_label.column_title"),
    attrName: "headerName",
    setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    id: `${baseWidgetName}-column-columnType`,
    labelName: i18n.t("editor.inspect.setter_label.column_type"),
    attrName: "columnType",
    setterType: "DATA_GRID_TYPE_SELECT_SETTER",
    options: ColumnTypeList,
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    id: `${baseWidgetName}-column-description`,
    labelName: i18n.t("editor.inspect.setter_label.column_description"),
    labelDesc: i18n.t("editor.inspect.setter_tips.column_description"),
    attrName: "description",
    setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    id: `${baseWidgetName}-column-width`,
    labelName: i18n.t("editor.inspect.setter_label.width"),
    labelDesc: i18n.t("editor.inspect.setter_tips.width"),
    attrName: "width",
    setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
    expectedType: VALIDATION_TYPES.NUMBER,
  },
  {
    id: `${baseWidgetName}-column-sortable`,
    labelName: i18n.t("editor.inspect.setter_label.enable_users_to_sort"),
    labelDesc: i18n.t("editor.inspect.setter_tips.enable_users_to_sort"),
    attrName: "sortable",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    defaultValue: true,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-pinnable`,
    labelName: i18n.t("editor.inspect.setter_label.enable_users_to_pin"),
    labelDesc: i18n.t("editor.inspect.setter_tips.enable_users_to_pin"),
    attrName: "pinnable",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    defaultValue: true,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-filterable`,
    labelName: i18n.t("editor.inspect.setter_label.enable_users_to_filter"),
    labelDesc: i18n.t("editor.inspect.setter_tips.enable_users_to_filter"),
    attrName: "filterable",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    defaultValue: true,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-hideable`,
    labelName: i18n.t("editor.inspect.setter_label.enable_users_to_hide"),
    labelDesc: i18n.t("editor.inspect.setter_tips.enable_users_to_hide"),
    attrName: "hideable",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    defaultValue: true,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-aggregable`,
    labelName: i18n.t("editor.inspect.setter_label.enable_users_to_aggregate"),
    labelDesc: i18n.t("editor.inspect.setter_tips.enable_users_to_aggregate"),
    attrName: "aggregable",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    defaultValue: true,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-groupable`,
    labelName: i18n.t(
      "editor.inspect.setter_label.enable_users_to_set_group_by",
    ),
    labelDesc: i18n.t(
      "editor.inspect.setter_tips.enable_users_to_set_group_by",
    ),
    attrName: "groupable",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    defaultValue: true,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-resizable`,
    labelName: i18n.t("editor.inspect.setter_label.enable_users_to_resize"),
    labelDesc: i18n.t("editor.inspect.setter_tips.enable_users_to_resize"),
    attrName: "resizable",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    defaultValue: true,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-disableReorder`,
    labelName: i18n.t("editor.inspect.setter_label.disable_users_to_reorder"),
    labelDesc: i18n.t("editor.inspect.setter_tips.disable_users_to_reorder"),
    attrName: "disableReorder",
    setterType: "DATA_GRID_COLUMN_SWITCH_SETTER",
    expectedType: VALIDATION_TYPES.BOOLEAN,
    openDynamic: true,
    useCustomLayout: true,
  },
  {
    id: `${baseWidgetName}-column-headerAlign`,
    setterType: "RADIO_GROUP_SETTER",
    labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
    attrName: "headerAlign",
    defaultValue: "left",
    options: [
      {
        label: <HorizontalStartIcon />,
        value: "left",
      },
      {
        label: <HorizontalCenterIcon />,
        value: "center",
      },
      {
        label: <HorizontalEndIcon />,
        value: "right",
      },
    ],
  },
]
export const DATA_GRID_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-data-source`,
        labelName: i18n.t("editor.inspect.setter_label.data_source"),
        useCustomLayout: true,
        attrName: "dataSource",
        setterType: "DATA_SOURCE_SELECT_SETTER",
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
      {
        id: `${baseWidgetName}-basic-primaryKey`,
        labelName: i18n.t("editor.inspect.setter_label.primary_key"),
        labelDesc: i18n.t("editor.inspect.setter_tips.primary_key"),
        attrName: "primaryKey",
        setterType: "DATA_GRID_COLUMNS_SELECT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        openDynamic: true,
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
        setterType: "DATA_GRID_COLUMN_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-sort`,
    groupName: i18n.t("editor.inspect.setter_group.sort"),
    children: [
      {
        id: `${baseWidgetName}-basic-sortKey`,
        labelName: i18n.t("editor.inspect.setter_label.default_sort_key"),
        attrName: "sortKey",
        setterType: "DATA_GRID_COLUMNS_SELECT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-basic-sortOrder`,
        labelName: i18n.t("editor.inspect.setter_label.default_sort_order"),
        attrName: "sortOrder",
        setterType: "RADIO_GROUP_SETTER",
        isSetterSingleRow: true,
        bindAttrName: ["sortKey"],
        shown: (value) => value !== "default",
        options: [
          { label: i18n.t("widget.table.ascend"), value: "asc" },
          { label: i18n.t("widget.table.descend"), value: "desc" },
          { label: i18n.t("widget.table.default"), value: "default" },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-rowSelection`,
    groupName: i18n.t("editor.inspect.setter_group.row_selection"),
    children: [
      {
        id: `${baseWidgetName}-basic-rowSelection`,
        labelName: i18n.t(" editor.inspect.setter_label.allow_users_select"),
        labelDesc: i18n.t(" editor.inspect.setter_tips.allow_users_select"),
        attrName: "rowSelection",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-rowSelectionMode`,
        labelName: i18n.t("editor.inspect.setter_label.selection_mode"),
        labelDesc: i18n.t("editor.inspect.setter_tips.selection_mode"),
        attrName: "rowSelectionMode",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "single",
        isSetterSingleRow: true,
        bindAttrName: ["rowSelection"],
        shown: (value) => value,
        options: [
          {
            label: i18n.t("editor.inspect.setter_options.single_row_selection"),
            value: "single",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_options.multiple_row_selection",
            ),
            value: "multiple",
          },
        ],
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
        id: `${baseWidgetName}-basic-enableServerSidePagination`,
        labelName: i18n.t(
          "editor.inspect.setter_label.table.enable_server_side_p",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.table.enable_server_side_p",
        ),
        attrName: "enableServerSidePagination",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-column-paginationType`,
        labelName: i18n.t("editor.inspect.setter_label.table.pagination_type"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.pagination_type"),
        attrName: "paginationType",
        setterType: "SEARCH_SELECT_SETTER",
        isSetterSingleRow: true,
        bindAttrName: ["enableServerSidePagination"],
        shown: (value) => value,
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_option.table.limit_offset_based",
            ),
            value: "limitOffsetBased",
          },
          {
            label: i18n.t("editor.inspect.setter_option.table.cursor_based"),
            value: "cursorBased",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-totalRowCount`,
        labelName: i18n.t("editor.inspect.setter_label.table.total_row_count"),
        attrName: "totalRowCount",
        setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        bindAttrName: ["enableServerSidePagination"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-basic-previousCursor`,
        labelName: i18n.t("editor.inspect.setter_label.previous_cursor"),
        attrName: "previousCursor",
        setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["enableServerSidePagination", "paginationType"],
        shown: (enable, paginationType) =>
          enable && paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-nextCursor`,
        labelName: i18n.t("editor.inspect.setter_label.table.next_cursor"),
        attrName: "nextCursor",
        setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["enableServerSidePagination", "paginationType"],
        shown: (enable, paginationType) =>
          enable && paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-hasNextPage`,
        labelName: i18n.t("editor.inspect.setter_label.table.has_next_page"),
        attrName: "hasNextPage",
        setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: ["enableServerSidePagination", "paginationType"],
        shown: (enable, paginationType) =>
          enable && paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-pageSize`,
        labelName: i18n.t("editor.inspect.setter_label.pageSize"),
        placeholder: "{{30}}",
        attrName: "pageSize",
        setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
        bindAttrName: [
          "overFlow",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (overFlow) => overFlow === "pagination",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-basic-page`,
        labelName: i18n.t("editor.inspect.setter_label.page"),
        placeholder: "{{0}}",
        attrName: "page",
        setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
        bindAttrName: [
          "overFlow",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (overFlow, enableServerSidePagination, paginationType) =>
          overFlow === "pagination" &&
          (enableServerSidePagination
            ? paginationType === "limitOffsetBased"
            : true),
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-basic-pageSizeOptions`,
        labelName: i18n.t("editor.inspect.setter_label.page_size_options"),
        placeholder: "{{[5, 10, 25]}}",
        attrName: "pageSizeOptions",
        setterType: "DATA_GRID_MAPPED_INPUT_SETTER",
        bindAttrName: ["overFlow"],
        shown: (overFlow) => overFlow === "pagination",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.ARRAY,
      },
    ],
  },
  {
    id: `${baseWidgetName}-toolbar`,
    groupName: i18n.t("editor.inspect.setter_group.toolbar"),
    children: [
      {
        id: `${baseWidgetName}-basic-densitySetting`,
        labelName: i18n.t("editor.inspect.setter_content.density_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.density_setting"),
        attrName: "densitySetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-columnSetting`,
        labelName: i18n.t("editor.inspect.setter_content.column_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.column_setting"),
        attrName: "columnSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-refreshSetting`,
        labelName: i18n.t("editor.inspect.setter_content.refresh_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.refresh_setting"),
        attrName: "refreshSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-exportSetting`,
        labelName: i18n.t("editor.inspect.setter_label.export_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.export_setting"),
        attrName: "exportSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-exportAllSetting`,
        labelName: i18n.t(
          "editor.inspect.setter_label.table.export_all_data_setting",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.table.export_all_data_setting",
        ),
        attrName: "exportAllSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-filterSetting`,
        labelName: i18n.t("editor.inspect.setter_label.filter_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.filter_setting"),
        attrName: "filterSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-quickFilterSetting`,
        labelName: i18n.t("editor.inspect.setter_label.quick_filter_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.quick_filter_setting"),
        attrName: "quickFilterSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-excludeHiddenColumns`,
        labelName: i18n.t("editor.inspect.setter_label.exclude_hidden_columns"),
        labelDesc: i18n.t(
          "editor.inspect.setter_tooltip.exclude_hidden_columns",
        ),
        attrName: "excludeHiddenColumns",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: ["quickFilterSetting"],
        shown: (value) => value,
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
          DATA_GRID_EVENT_HANDLER_CONFIG.events,
        ),
      },
    ],
  },
]
