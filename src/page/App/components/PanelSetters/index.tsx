import { ListSetter } from "./ListSetter"
import { BaseInput } from "./InputSetter/baseInput"
import { BaseRadioGroupSetter } from "./RadioGroupSetter/baseRadioGroup"
import { BaseSwitchSetter } from "./SwitchSetter/baseSwitch"
import { DynamicSwitchSetter } from "./SwitchSetter/dynamicSwitch"
import { BaseSelect } from "./SelectSetter/baseSelect"
import { ColorSelectSetter } from "./SelectSetter/colorSelect"
import { OptionListSetter } from "@/page/App/components/PanelSetters/OptionListSetter"
import { MappedOptionSetter } from "@/page/App/components/PanelSetters/MappedOptionSetter"
import { SearchSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/searchSelect"
import { DateRangeValueSetter } from "@/page/App/components/PanelSetters/DateRangeValueSetter"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: BaseSwitchSetter,
  SEARCH_SWITCH_SETTER: SearchSelectSetter,
  LIST_SETTER: ListSetter,
  DYNAMIC_SWITCH_SETTER: DynamicSwitchSetter,
  BASE_SELECT_SETTER: BaseSelect,
  COLOR_SELECT_SETTER: ColorSelectSetter,
  OPTION_LIST_SETTER: OptionListSetter,
  OPTION_MAPPED_SETTER: MappedOptionSetter,
  DATE_RANGE_VALUE_SETTER: DateRangeValueSetter,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
