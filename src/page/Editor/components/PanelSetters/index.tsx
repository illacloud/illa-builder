import SwitchSetter from "./SwitchSetter"
import ListSetter from "./ListSetter"
import BaseInput from "./InputSetter/baseInput"
import BaseRadioGroupSetter from "./RadioGroupSetter/baseRadioGroup"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: SwitchSetter,
  LIST_SETTER: ListSetter,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
