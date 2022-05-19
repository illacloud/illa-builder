import ListSetter from "./ListSetter"
import BaseInput from "./InputSetter/baseInput"
import BaseRadioGroupSetter from "./RadioGroupSetter/baseRadioGroup"
// import EventHandlerSetter from "./EventHandlerSetter"
import BaseSwitchSetter from "./SwitchSetter/baseSwitch"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: BaseSwitchSetter,
  LIST_SETTER: ListSetter,
  // EVENT_HANDLER_SETTER: EventHandlerSetter,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
