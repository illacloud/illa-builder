import { ChartColorSelectSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartColorSelectSetter"
import { ChartDataSourceSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartDataSource"
import { ChartDatasetsSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter"
import { ChartKeysSelectSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartKeysSelectSetter"
import { ChartTypeSelectSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartTypeSelectSetter"
import { ColorPickerSetter } from "@/page/App/components/PanelSetters/ColorPickerSetter"
import { ViewsSetter } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter"
import { ContainerDefaultViewKeySetter } from "@/page/App/components/PanelSetters/ContainerSetter/defaultViewKeySetter"
import { EventHandlerSetter } from "@/page/App/components/PanelSetters/EventHandlerSetter"
import { IconSelector } from "@/page/App/components/PanelSetters/IconSetter/IconSelector"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { EditableInputSetter } from "@/page/App/components/PanelSetters/InputSetter/editableInputSetter"
import { InputWithSelectSetter } from "@/page/App/components/PanelSetters/InputSetter/inputWithSelect"
import { OptionMappedInputSetter } from "@/page/App/components/PanelSetters/InputSetter/optionMappedInputSetter"
import { ListSetter } from "@/page/App/components/PanelSetters/ListSetter"
import { MappedOptionSetter } from "@/page/App/components/PanelSetters/MappedOptionSetter"
import { MenuOptionSetter } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter"
import { OptionListSetter } from "@/page/App/components/PanelSetters/OptionListSetter"
import { CarouselListSetter } from "@/page/App/components/PanelSetters/OptionListSetter/CarouselListSetter"
import { BaseRadioGroupSetter } from "@/page/App/components/PanelSetters/RadioGroupSetter/baseRadioGroup"
import { BaseDynamicSelect } from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { DataSourceSetter } from "@/page/App/components/PanelSetters/SelectSetter/dataSourceSelectSetter"
import { EventActionTypeSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventActionTypeSelect"
import { EventTargetActionSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventTargetActionSelect"
import { EventTargetWidgetSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventTargetWidgetSelect"
import { EventWidgetMethodSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventWidgetMethodSelect"
import { HeightModeSelect } from "@/page/App/components/PanelSetters/SelectSetter/heightModeSelect"
import { SearchSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/searchSelect"
import { BaseSwitchSetter } from "@/page/App/components/PanelSetters/SwitchSetter/baseSwitch"
import { DynamicSwitchSetter } from "@/page/App/components/PanelSetters/SwitchSetter/dynamicSwitch"
import { ColumnSetter } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter"
import { ColumnsSelectSetter } from "@/page/App/components/PanelSetters/TableSetter/columsSelectSetter"
import { TableDataInputSetter } from "@/page/App/components/PanelSetters/TableSetter/tableDataInputSetter"
import { TableDataSourceSelectSetter } from "@/page/App/components/PanelSetters/TableSetter/tableDataSourceSelectSetter"
import { TableMappedValueInputSetter } from "@/page/App/components/PanelSetters/TableSetter/tableMappedValueInputSetter"
import { TabListSetter } from "@/page/App/components/PanelSetters/TabsSetter/TabListSetter"
import { TabsContainerSelectSetter } from "@/page/App/components/PanelSetters/TabsSetter/TabsContainerSelectSetter"
import { TabsDefaultKeySetter } from "@/page/App/components/PanelSetters/TabsSetter/defaultTabKeySetter"
import { EditableInputWithMeasureSetter } from "./InputSetter/editableInputSetterWithMeasure"
import { EventTargetViewSelect } from "./SelectSetter/eventBodyViewSelect"
import { EventTargetPageSelect } from "./SelectSetter/pageSelect"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  ICON_SETTER: IconSelector,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: BaseSwitchSetter,
  SEARCH_SELECT_SETTER: SearchSelectSetter,
  INPUT_WITH_SELECT_SETTER: InputWithSelectSetter,
  LIST_SETTER: ListSetter,
  DYNAMIC_SWITCH_SETTER: DynamicSwitchSetter,
  BASE_SELECT_SETTER: BaseSelectSetter,
  COLOR_PICKER_SETTER: ColorPickerSetter,
  OPTION_LIST_SETTER: OptionListSetter,
  CAROUSEL_LIST_SETTER: CarouselListSetter,
  COLUMN_SETTER: ColumnSetter,
  COLUMNS_SELECT_SETTER: ColumnsSelectSetter,
  TABS_LIST_SETTER: TabListSetter,
  TABS_DEFAULT_KEY_SETTER: TabsDefaultKeySetter,
  TABS_CONTAINER_SELECT_SETTER: TabsContainerSelectSetter,
  TABLE_DATA_INPUT_SETTER: TableDataInputSetter,
  TABLE_MAPPED_VALUE_INPUT_SETTER: TableMappedValueInputSetter,
  TABLE_DATASOURCE_SELECT_SETTER: TableDataSourceSelectSetter,
  OPTION_MAPPED_SETTER: MappedOptionSetter,
  EVENT_HANDLER_SETTER: EventHandlerSetter,
  EVENT_TARGET_SELECT_SETTER: EventTargetWidgetSelect,
  EVENT_TARGET_ACTION_SELECT_SETTER: EventTargetActionSelect,
  EVENT_TARGET_PAGE_SELECT_SETTER: EventTargetPageSelect,
  EVENT_TARGET_VIEW_PATH_SELECT_SETTER: EventTargetViewSelect,
  OPTION_MAPPED_INPUT_SETTER: OptionMappedInputSetter,
  EVENT_WIDGET_METHOD_SELECT_SETTER: EventWidgetMethodSelect,
  EVENT_ACTION_SELECT_SETTER: EventActionTypeSelect,
  EDITABLE_INPUT_SETTER: EditableInputSetter,
  EDITABLE_INPUT_WITH_MEASURE_SETTER: EditableInputWithMeasureSetter,
  BASE_DYNAMIC_SELECT_SETTER: BaseDynamicSelect,
  CHART_DATASOURCE_SELECT_SETTER: ChartDataSourceSetter,
  CHART_KEYS_SELECT_SETTER: ChartKeysSelectSetter,
  CHART_DATASETS_SETTER: ChartDatasetsSetter,
  CHART_COLOR_SELECT_SETTER: ChartColorSelectSetter,
  CHART_TYPE_SELECT_SETTER: ChartTypeSelectSetter,
  CONTAINER_VIEW_SETTER: ViewsSetter,
  CONTAINER_DEFAULT_VIEW_SETTER: ContainerDefaultViewKeySetter,
  MENU_OPTION_SETTER: MenuOptionSetter,
  DATA_SOURCE_SELECT_SETTER: DataSourceSetter,
  HEIGHT_MODE_SELECT: HeightModeSelect,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
