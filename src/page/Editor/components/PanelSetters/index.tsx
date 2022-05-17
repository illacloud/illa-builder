import InputSetter from "./InputSetter"
import RadioGroupSetter from "./RadioGroupSetter"
import SwitchSetter from "./SwitchSetter"
import TextValueSetter from "./TextValueSetter"
import AlignmentSetter from "./AlignmentSetter"

const SetterTypeMapSetter = {
  INPUT_SETTER: InputSetter,
  RADIO_GROUP_SETTER: RadioGroupSetter,
  SWITCH_SETTER: SwitchSetter,
  TEXT_VALUE_SETTER: TextValueSetter,
  ALIGNMENT_SETTER: AlignmentSetter,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
