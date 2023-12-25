import { lazy } from "react"

const DeprecatedSetterTypeMapSetter = {
  COLUMN_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TableSetter/ColumnSetter"
      ),
  ),
  COLUMN_TYPE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TableSetter/columnTypeSelectSetter"
      ),
  ),
  COLUMNS_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TableSetter/columsSelectSetter"
      ),
  ),
  TABLE_MAPPED_VALUE_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TableSetter/tableMappedValueInputSetter"
      ),
  ),
  TABLE_DATASOURCE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TableSetter/tableDataSourceSelectSetter"
      ),
  ),
  CELL_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TableSetter/CellSetter"
      ),
  ),
}

const SetterTypeMapSetter = {
  INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/InputSetter/BaseInput"
      ),
  ),
  SCRIPT_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/InputSetter/ScriptInput"
      ),
  ),
  ICON_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/IconSetter/IconSelector"
      ),
  ),
  RADIO_GROUP_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/RadioGroupSetter/baseRadioGroup"
      ),
  ),
  SWITCH_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SwitchSetter/baseSwitch"
      ),
  ),
  SEARCH_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/searchSelect"
      ),
  ),
  DYNAMIC_SWITCH_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SwitchSetter/dynamicSwitch"
      ),
  ),
  BASE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/baseSelect"
      ),
  ),
  OPTION_LIST_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/OptionListSetter"
      ),
  ),
  STEPS_LIST_SETTER: lazy(
    () =>
      import("@/page/App/components/InspectPanel/PanelSetters/StepsListSetter"),
  ),
  CAROUSEL_LIST_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/CarouselListSetter"
      ),
  ),
  DATA_GRID_COLUMNS_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnsSelectSetter"
      ),
  ),
  DATA_GRID_COLUMN_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSetter"
      ),
  ),
  DATA_GRID_COLUMN_BUTTON_GROUP_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnButtonGroupSetter"
      ),
  ),
  DATA_GRID_MAPPED_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnMappedInput"
      ),
  ),
  DATA_GRID_COLUMN_SWITCH_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSwitchSetter"
      ),
  ),
  DATA_GRID_TYPE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnTypeSelectSetter"
      ),
  ),
  DATA_GRID_MAPPED_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnMappedSelect"
      ),
  ),
  TABS_LIST_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TabsSetter/TabListSetter"
      ),
  ),
  TABS_DEFAULT_KEY_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TabsSetter/DefaultTabKeySetter"
      ),
  ),
  TABS_CONTAINER_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/TabsSetter/TabsContainerSelectSetter"
      ),
  ),
  OPTION_MAPPED_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/MappedOptionSetter"
      ),
  ),
  EVENT_HANDLER_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter"
      ),
  ),
  EVENT_TARGET_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/eventTargetWidgetSelect"
      ),
  ),
  EVENT_TARGET_ACTION_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/eventTargetActionSelect"
      ),
  ),
  EVENT_TARGET_PAGE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/pageSelect"
      ),
  ),
  EVENT_TARGET_VIEW_PATH_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/eventBodyViewSelect"
      ),
  ),
  OPTION_MAPPED_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/InputSetter/OptionMappedInput/optionMappedInputSetter"
      ),
  ),
  EVENT_WIDGET_METHOD_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/eventWidgetMethodSelect"
      ),
  ),
  EVENT_ACTION_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/eventActionTypeSelect"
      ),
  ),
  CHART_KEYS_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartKeysSelectSetter"
      ),
  ),
  CHART_KEYS_DYNAMIC_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartKeysDynamicSelectSetter"
      ),
  ),
  CHART_DATASETS_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartDatasetsSetter"
      ),
  ),
  CHART_COLOR_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartColorSelectSetter"
      ),
  ),
  CHART_TYPE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartTypeSelectSetter"
      ),
  ),
  CONTAINER_VIEW_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter"
      ),
  ),
  CONTAINER_DEFAULT_VIEW_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/defaultViewKeySetter"
      ),
  ),
  MENU_OPTION_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/MenuSetter/MenuOptionSetter"
      ),
  ),
  DATA_SOURCE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/dataSourceSelectSetter"
      ),
  ),
  HEIGHT_MODE_SELECT: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/heightModeSelect"
      ),
  ),
  SHADOW_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/ShadowSelect"
      ),
  ),
  EVENT_TARGET_STATE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/eventTargetStateSelect"
      ),
  ),
  CALENDAR_EVENT_LIST_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/CalendarEventListSetter"
      ),
  ),
  EVENT_CALENDAR_SELECT: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/eventCalendarSelect"
      ),
  ),
  DRIVE_WITH_STATUS_SWITCH_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SwitchSetter/driveWithStatusSwitch"
      ),
  ),
  PADDING_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/InputSetter/PaddingInput"
      ),
  ),
  BORDER_SETTER: lazy(
    () =>
      import("@/page/App/components/InspectPanel/PanelSetters/BorderSetter"),
  ),
  STYLE_CONTAINER_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/StyleContainerSetter"
      ),
  ),
  COLOR_PICKER_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ColorPickerSetter"
      ),
  ),
  MEASURE_CHECK_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/InputSetter/MeasureCheckInput"
      ),
  ),
  FILE_MIN_MAX_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/InputSetter/FileMinMaxSetter"
      ),
  ),
  DRIVE_SOURCE_GROUP_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter"
      ),
  ),
  ITEM_BORDER_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/ItemBorderSetter"
      ),
  ),
  LIST_GAP_SETTER: lazy(
    () =>
      import("@/page/App/components/InspectPanel/PanelSetters/ListGapSetter"),
  ),
  CUSTOM_BG_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/CustomBgSelect"
      ),
  ),
  MEASURE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/MeasureSelectSetter"
      ),
  ),
  DYNAMIC_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/dynamicSelectSetter"
      ),
  ),
  ...DeprecatedSetterTypeMapSetter,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
