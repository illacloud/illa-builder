import { v4 } from "uuid"
import { OptionItemShape } from "@/page/App/components/PanelSetters/OptionListSetter/interface"

export const generateOptionItemId = () => `option-${v4()}`

export const generateNewOptionItem = (number: number): OptionItemShape => ({
  id: generateOptionItemId(),
  value: `Option ${number}`,
  label: `Option ${number}`,
})
