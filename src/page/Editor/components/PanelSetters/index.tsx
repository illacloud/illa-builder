import { ListSetter } from "./ListSetter"
import { BaseInput } from "./InputSetter/baseInput"
import { BaseRadioGroupSetter } from "./RadioGroupSetter/baseRadioGroup"
import { BaseSwitchSetter } from "./SwitchSetter/baseSwitch"
import { DynamicSwitchSetter } from "./SwitchSetter/dynamicSwitch"
import { BaseSelect } from "./SelectSetter/baseSelect"
import { ColorSelectSetter } from "./SelectSetter/colorSelect"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: BaseSwitchSetter,
  LIST_SETTER: ListSetter,
  DYNAMIC_SWITCH_SETTER: DynamicSwitchSetter,
  BASE_SELECT_SETTER: BaseSelect,
  COLOR_SELECT_SETTER: ColorSelectSetter,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
