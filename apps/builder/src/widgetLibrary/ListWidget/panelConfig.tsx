import RadioIcon from "@/assets/radius-icon.svg?react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { LIST_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/ListWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { PAGINATION_TYPE } from "./interface"

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
        id: `${baseWidgetName}-interaction-loading`,
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.loading"),
        attrName: "loading",
        placeholder: "{{false}}",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
    id: `${baseWidgetName}-PAGINATION`,
    groupName: i18n.t("editor.inspect.setter_group.pagination"),
    children: [
      {
        id: `${baseWidgetName}-basic-enable_pagination`,
        labelName: i18n.t("editor.inspect.setter_label.enable_pagination"),
        attrName: "enablePagination",
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
        bindAttrName: ["enablePagination"],
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        shown: (v) => v,
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
        bindAttrName: ["enablePagination", "enableServerSidePagination"],
        shown: (enablePagination, enableServerSidePagination) =>
          enablePagination && enableServerSidePagination,
        defaultValue: PAGINATION_TYPE.LIMIT_OFFSET_BASED,
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_option.table.limit_offset_based",
            ),
            value: PAGINATION_TYPE.LIMIT_OFFSET_BASED,
          },
          {
            label: i18n.t("editor.inspect.setter_option.table.cursor_based"),
            value: PAGINATION_TYPE.CURSOR_BASED,
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-totalRowCount`,
        labelName: i18n.t("editor.inspect.setter_label.table.total_row_count"),
        attrName: "totalRowCount",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        bindAttrName: [
          "enablePagination",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (
          enablePagination,
          enableServerSidePagination,
          paginationType,
        ) => {
          return (
            enablePagination &&
            enableServerSidePagination &&
            paginationType === PAGINATION_TYPE.LIMIT_OFFSET_BASED
          )
        },
      },
      {
        id: `${baseWidgetName}-basic-previousCursor`,
        labelName: i18n.t("editor.inspect.setter_label.previous_cursor"),
        attrName: "previousCursor",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: [
          "enablePagination",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (enablePagination, enableServerSidePagination, paginationType) =>
          enablePagination &&
          enableServerSidePagination &&
          paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-nextCursor`,
        labelName: i18n.t("editor.inspect.setter_label.table.next_cursor"),
        attrName: "nextCursor",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: [
          "enablePagination",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (enablePagination, enableServerSidePagination, paginationType) =>
          enablePagination &&
          enableServerSidePagination &&
          paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-hasNextPage`,
        labelName: i18n.t("editor.inspect.setter_label.table.has_next_page"),
        attrName: "hasNextPage",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: [
          "enablePagination",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (enablePagination, enableServerSidePagination, paginationType) =>
          enablePagination &&
          enableServerSidePagination &&
          paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-pageSize`,
        labelName: i18n.t("editor.inspect.setter_label.pageSize"),
        attrName: "pageSize",
        setterType: "INPUT_SETTER",
        bindAttrName: ["enablePagination"],
        shown: (v) => v,
        expectedType: VALIDATION_TYPES.NUMBER,
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
          {
            label: i18n.t("editor.inspect.setter_option.auto_height"),
            value: "auto",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-item_gap`,
        setterType: "LIST_GAP_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.grid_list.item_spacing"),
        labelDesc: i18n.t("editor.inspect.setter_tips.grid_list.item_spacing"),
        attrName: "itemGap",
        expectedType: VALIDATION_TYPES.NUMBER,
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
        id: `${baseWidgetName}-styles-border`,
        setterType: "ITEM_BORDER_SETTER",
        useCustomLayout: true,
        attrName: "itemBorder",
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
            labelName: i18n.t(
              "editor.inspect.setter_label.grid_list.item_radius",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.grid_list.item_radius",
            ),
            attrName: "itemBorderRadius",
            setterType: "MEASURE_CHECK_INPUT_SETTER",
            useCustomLayout: true,
            icon: <RadioIcon />,
            defaultValue: "4px",
          },
          {
            id: `${baseWidgetName}-style-shadow`,
            labelName: i18n.t(
              "editor.inspect.setter_label.grid_list.item_shadow",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.grid_list.item_shadow",
            ),
            attrName: "itemShadow",
            setterType: "SHADOW_SELECT_SETTER",
            useCustomLayout: true,
            defaultValue: "medium",
          },
        ],
      },
      {
        id: `${baseWidgetName}-style-color`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-colors-color`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            attrName: "themeColor",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-style-color`,
            labelName: i18n.t(
              "editor.inspect.setter_label.item_background_color",
            ),
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            attrName: "itemBackGroundColor",
            defaultValue: "white",
          },
        ],
      },
      {
        id: `${baseWidgetName}-styles-padding`,
        setterType: "PADDING_INPUT_SETTER",
        labelName: i18n.t("editor.inspect.setter_group.item_padding"),
        attrName: "itemPadding",
        useCustomLayout: true,
      },
    ],
  },
]
