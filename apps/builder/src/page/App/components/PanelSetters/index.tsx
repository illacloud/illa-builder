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
import { ChartTypeSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartTypeSetter"

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
  OPTION_MAPPED_SETTER: MappedOptionSetter,
  EVENT_HANDLER_SETTER: EventHandlerSetter,
  EVENT_TARGET_SELECT_SETTER: EventTargetWidgetSelect,
  EVENT_TARGET_ACTION_SELECT_SETTER: EventTargetActionSelect,
  OPTION_MAPPED_INPUT_SETTER: OptionMappedInputSetter,
  EVENT_WIDGET_METHOD_SELECT_SETTER: EventWidgetMethodSelect,
  EVENT_ACTION_SELECT_SETTER: EventActionTypeSelect,
  EDITABLE_INPUT_SETTER: EditableInputSetter,
  BASE_DYNAMIC_SELECT_SETTER: BaseDynamicSelect,
  CHART_DATASOURCE_SELECT_SETTER: ChartDataSourceSetter,
  CHART_TYPE_SELECT_SETTER: ChartTypeSetter,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
