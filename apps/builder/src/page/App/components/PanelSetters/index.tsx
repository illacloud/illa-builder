import { OptionListSetter } from "@/page/App/components/PanelSetters/OptionListSetter"
import { MappedOptionSetter } from "@/page/App/components/PanelSetters/MappedOptionSetter"
import { SearchSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/searchSelect"
import { EventTargetWidgetSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventTargetWidgetSelect"
import { EventTargetActionSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventTargetActionSelect"
import { OptionMappedInputSetter } from "@/page/App/components/PanelSetters/InputSetter/optionMappedInputSetter"
import { EventHandlerSetter } from "@/page/App/components/PanelSetters/EventHandlerSetter"
import { EventWidgetMethodSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventWidgetMethodSelect"
import { EventActionTypeSelect } from "@/page/App/components/PanelSetters/SelectSetter/eventActionTypeSelect"
import { ColorPickerSetter } from "@/page/App/components/PanelSetters/ColorPickerSetter"
import { EditableInputSetter } from "@/page/App/components/PanelSetters/InputSetter/editableInputSetter"
import { BaseRadioGroupSetter } from "@/page/App/components/PanelSetters/RadioGroupSetter/baseRadioGroup"
import { BaseSwitchSetter } from "@/page/App/components/PanelSetters/SwitchSetter/baseSwitch"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { ListSetter } from "@/page/App/components/PanelSetters/ListSetter"
import { DynamicSwitchSetter } from "@/page/App/components/PanelSetters/SwitchSetter/dynamicSwitch"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { CalcSelfInput } from "@/page/App/components/PanelSetters/InputSetter/calcSelfInput"
import { BaseDynamicSelect } from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import { ChartDataSourceSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartDataSource"
import { ChartKeysSelectSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartKeysSelectSetter"
import { ChartDatasetsSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter"
import { ChartColorSelectSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartColorSelectSetter"
import { ChartTypeSelectSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartTypeSelectSetter"
import { ColumnSetter } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter"
import { ColumnsSelectSetter } from "@/page/App/components/PanelSetters/TableSetter/columsSelectSetter"
import { TableDataInputSetter } from "@/page/App/components/PanelSetters/TableSetter/tableDataInputSetter"
import { ViewsSetter } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter"
import { ContainerDefaultViewKeySetter } from "@/page/App/components/PanelSetters/ContainerSetter/defaultViewKeySetter"
import { TabListSetter } from "@/page/App/components/PanelSetters/TabsSetter/TabListSetter"
import { TabsContainerSelectSetter } from "@/page/App/components/PanelSetters/TabsSetter/TabsContainerSelectSetter"
import { TabsDefaultKeySetter } from "@/page/App/components/PanelSetters/TabsSetter/defaultTabKeySetter"
import { MenuOptionSetter } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter"
import { EventTargetPageSelect } from "./SelectSetter/pageSelect"
import { EventTargetViewSelect } from "./SelectSetter/eventBodyViewSelect"
import { EditableInputWithMeasureSetter } from "./InputSetter/editableInputSetterWithMeasure"
import { TableDataSourceSelectSetter } from "@/page/App/components/PanelSetters/TableSetter/tableDataSourceSelectSetter"
import { DataSourceSetter } from "@/page/App/components/PanelSetters/SelectSetter/dataSourceSelectSetter"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: BaseSwitchSetter,
  SEARCH_SELECT_SETTER: SearchSelectSetter,
  LIST_SETTER: ListSetter,
  CALC_SELF_INPUT_SETTER: CalcSelfInput,
  DYNAMIC_SWITCH_SETTER: DynamicSwitchSetter,
  BASE_SELECT_SETTER: BaseSelectSetter,
  COLOR_PICKER_SETTER: ColorPickerSetter,
  OPTION_LIST_SETTER: OptionListSetter,
  COLUMN_SETTER: ColumnSetter,
  COLUMNS_SELECT_SETTER: ColumnsSelectSetter,
  TABS_LIST_SETTER: TabListSetter,
  TABS_DEFAULT_KEY_SETTER: TabsDefaultKeySetter,
  TABS_CONTAINER_SELECT_SETTER: TabsContainerSelectSetter,
  TABLE_DATA_INPUT_SETTER: TableDataInputSetter,
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
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
