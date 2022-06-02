import { ListSetter } from "./ListSetter"
import { BaseInput } from "./InputSetter/baseInput"
import { BaseRadioGroupSetter } from "./RadioGroupSetter/baseRadioGroup"
import { BaseSwitchSetter } from "./SwitchSetter/baseSwitch"
import { DynamicSwitchSetter } from "./SwitchSetter/dynamicSwitch"
import { ColorSelectSetter } from "./SelectSetter/colorSelect"
import { OptionListSetter } from "@/page/Editor/components/PanelSetters/OptionListSetter"
import { MappedOptionSetter } from "@/page/Editor/components/PanelSetters/MappedOptionSetter"
import { SearchSelectSetter } from "@/page/Editor/components/PanelSetters/SelectSetter/searchSelect"
import { BaseSelect } from "@/page/Editor/components/PanelSetters/SelectSetter/baseSelect"
import { DynamicSelectSetter } from "@/page/Editor/components/PanelSetters/SelectSetter/dynamicSelect"
import { TextAreaInput } from "@/page/Editor/components/PanelSetters/InputSetter/textAreaInput"
import { ChartDataSetter } from "@/page/Editor/components/PanelSetters/SelectSetter/chartDataSetter"
import { DatasetsList } from "@/page/Editor/components/PanelSetters/ListSetter/datasetsList"

const SetterTypeMapSetter = {
  INPUT_SETTER: BaseInput,
  TEXTAREA_SETTER: TextAreaInput,
  RADIO_GROUP_SETTER: BaseRadioGroupSetter,
  SWITCH_SETTER: BaseSwitchSetter,
  SEARCH_SWITCH_SETTER: SearchSelectSetter,
  LIST_SETTER: ListSetter,
  DYNAMIC_SWITCH_SETTER: DynamicSwitchSetter,
  BASE_SELECT_SETTER: BaseSelect,
  COLOR_SELECT_SETTER: ColorSelectSetter,
  OPTION_LIST_SETTER: OptionListSetter,
  OPTION_MAPPED_SETTER: MappedOptionSetter,
  SELECT_SETTER: BaseSelect,
  DYNAMIC_SELECT_SETTER: DynamicSelectSetter,
  CHART_DATA_SETTER: ChartDataSetter,
  CHART_DATASETS_LIST_SETTER: DatasetsList,
}

export type SetterType = keyof typeof SetterTypeMapSetter

export const getSetterByType = (type: SetterType) => {
  return SetterTypeMapSetter[type]
}
