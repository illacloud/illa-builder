import { v4 } from "uuid"
import { OptionItemShape } from "@/page/App/components/PanelSetters/OptionListSetter/interface"

export let nameSet = new Set<string>()

const generateDatasetName = (name?: string) => {
  let number = 1
  let TabName = `${name ?? "Option"} ${number}`
  while (nameSet.has(TabName)) {
    number++
    TabName = `${name ?? "Option"} ${number}`
  }
  return TabName
}

export const generateOptionItemId = (name?: string) =>
  `${(name ?? "option")?.toLowerCase()}-${v4()}`

export const generateNewOptionItem = (
  keys: string[],
  name?: string,
): OptionItemShape => {
  nameSet = new Set<string>(keys)
  const optionName = generateDatasetName(name)

  return {
    id: generateOptionItemId(name),
    value: optionName,
    label: optionName,
  }
}
