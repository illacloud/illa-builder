import { lazy } from "react"

const SetterTypeMapSetter = {
  INPUT_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/InputSetter/baseInput"),
  ),
  SCRIPT_INPUT_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/InputSetter/scriptInput"),
  ),
  ICON_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/IconSetter/IconSelector"),
  ),
  RADIO_GROUP_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/RadioGroupSetter/baseRadioGroup"
      ),
  ),
  SWITCH_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/SwitchSetter/baseSwitch"),
  ),
  SEARCH_SELECT_SETTER: lazy(
    () =>
      import("@/page/App/components/PanelSetters/SelectSetter/searchSelect"),
  ),
  INPUT_WITH_SELECT_SETTER: lazy(
    () =>
      import("@/page/App/components/PanelSetters/InputSetter/inputWithSelect"),
  ),
  LIST_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/ListSetter"),
  ),
  DYNAMIC_SWITCH_SETTER: lazy(
    () =>
      import("@/page/App/components/PanelSetters/SwitchSetter/dynamicSwitch"),
  ),
  DYNAMIC_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/DynamicSelectSetter"
      ),
  ),
  BASE_SELECT_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/SelectSetter/baseSelect"),
  ),
  COLOR_PICKER_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/ColorPickerSetter"),
  ),
  OPTION_LIST_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/OptionListSetter"),
  ),
  STEPS_LIST_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/OptionListSetter/StepsListSetter"
      ),
  ),
  CAROUSEL_LIST_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/OptionListSetter/CarouselListSetter"
      ),
  ),
  CELL_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/TableSetter/CellSetter"),
  ),
  COLUMN_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/TableSetter/ColumnSetter"),
  ),
  COLUMN_TYPE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/TableSetter/columnTypeSelectSetter"
      ),
  ),
  COLUMNS_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/TableSetter/columsSelectSetter"
      ),
  ),
  TABS_LIST_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/TabsSetter/TabListSetter"),
  ),
  TABS_DEFAULT_KEY_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/TabsSetter/defaultTabKeySetter"
      ),
  ),
  TABS_CONTAINER_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/TabsSetter/TabsContainerSelectSetter"
      ),
  ),
  TABLE_MAPPED_VALUE_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/TableSetter/tableMappedValueInputSetter"
      ),
  ),
  TABLE_DATASOURCE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/TableSetter/tableDataSourceSelectSetter"
      ),
  ),
  OPTION_MAPPED_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/MappedOptionSetter"),
  ),
  EVENT_HANDLER_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/EventHandlerSetter"),
  ),
  EVENT_TARGET_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/eventTargetWidgetSelect"
      ),
  ),
  EVENT_TARGET_ACTION_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/eventTargetActionSelect"
      ),
  ),
  EVENT_TARGET_PAGE_SELECT_SETTER: lazy(
    () => import("@/page/App/components/PanelSetters/SelectSetter/pageSelect"),
  ),
  EVENT_TARGET_VIEW_PATH_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/eventBodyViewSelect"
      ),
  ),
  OPTION_MAPPED_INPUT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/InputSetter/optionMappedInputSetter"
      ),
  ),
  EVENT_WIDGET_METHOD_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/eventWidgetMethodSelect"
      ),
  ),
  EVENT_ACTION_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/eventActionTypeSelect"
      ),
  ),
  EDITABLE_INPUT_WITH_MEASURE_SETTER: lazy(
    () => import("./InputSetter/editableInputSetterWithMeasure"),
  ),
  BASE_DYNAMIC_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
      ),
  ),
  CHART_KEYS_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/ChartSetter/chartKeysSelectSetter"
      ),
  ),
  CHART_KEYS_DYNAMIC_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/ChartSetter/chartKeysDynamicSelectSetter"
      ),
  ),
  CHART_DATASETS_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter"
      ),
  ),
  CHART_COLOR_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/ChartSetter/chartColorSelectSetter"
      ),
  ),
  CHART_TYPE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/ChartSetter/chartTypeSelectSetter"
      ),
  ),
  CONTAINER_VIEW_SETTER: lazy(
    () =>
      import("@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter"),
  ),
  CONTAINER_DEFAULT_VIEW_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/ContainerSetter/defaultViewKeySetter"
      ),
  ),
  MENU_OPTION_SETTER: lazy(
    () =>
      import("@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter"),
  ),
  DATA_SOURCE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/dataSourceSelectSetter"
      ),
  ),
  HEIGHT_MODE_SELECT: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/heightModeSelect"
      ),
  ),
  SHADOW_SELECT_SETTER: lazy(
    () =>
      import("@/page/App/components/PanelSetters/SelectSetter/shadowSelect"),
  ),
  EVENT_TARGET_STATE_SELECT_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/eventTargetStateSelect"
      ),
  ),
  CALENDAR_EVENT_LIST_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/OptionListSetter/CalendarEventListSetter"
      ),
  ),
  EVENT_CALENDAR_SELECT: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SelectSetter/eventCalendarSelect"
      ),
  ),
  DRIVE_WITH_STATUS_SWITCH_SETTER: lazy(
    () =>
      import(
        "@/page/App/components/PanelSetters/SwitchSetter/driveWithStatusSwitch"
      ),
  ),
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
