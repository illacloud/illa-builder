import { ListSetter } from "./ListSetter"
import { BaseInput } from "./InputSetter/baseInput"
import { BaseRadioGroupSetter } from "./RadioGroupSetter/baseRadioGroup"
import { BaseSwitchSetter } from "./SwitchSetter/baseSwitch"
import { DynamicSwitchSetter } from "./SwitchSetter/dynamicSwitch"
import { BaseSelectSetter } from "./SelectSetter/baseSelect"
import { ColorSelectSetter } from "./SelectSetter/colorSelect"
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
import { TextAreaInput } from "@/page/App/components/PanelSetters/InputSetter/textArea"
import { DynamicSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/dynamicSelect"
import { ChartDataSetter } from "@/page/App/components/PanelSetters/ChartSetter/chartDataSetter"
import { RemoveDatasetButton } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter/removeDatasetButton"
import { DataSetColorListSetter } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter/colorSetter"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: BaseSwitchSetter,
  SEARCH_SELECT_SETTER: SearchSelectSetter,
  LIST_SETTER: ListSetter,
  DYNAMIC_SWITCH_SETTER: DynamicSwitchSetter,
  BASE_SELECT_SETTER: BaseSelectSetter,
  COLOR_SELECT_SETTER: ColorSelectSetter,
  COLOR_PICKER_SETTER: ColorPickerSetter,
  OPTION_LIST_SETTER: OptionListSetter,
  OPTION_MAPPED_SETTER: MappedOptionSetter,
  EVENT_HANDLER_SETTER: EventHandlerSetter,
  EVENT_TARGET_SELECT_SETTER: EventTargetWidgetSelect,
  EVENT_TARGET_ACTION_SELECT_SETTER: EventTargetActionSelect,
  OPTION_MAPPED_INPUT_SETTER: OptionMappedInputSetter,
  EVENT_WIDGET_METHOD_SELECT_SETTER: EventWidgetMethodSelect,
  EVENT_ACTION_SELECT_SETTER: EventActionTypeSelect,
  DYNAMIC_SELECT_SETTER: DynamicSelectSetter,
  TEXT_AREA: TextAreaInput,
  CHART_DATA_SETTER: ChartDataSetter,
  CHART_LINE_COLOR_LIST_SETTER: DataSetColorListSetter,
  CHART_REMOVE_BUTTON: RemoveDatasetButton,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
