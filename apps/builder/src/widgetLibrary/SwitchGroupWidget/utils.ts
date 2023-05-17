import {
  Pluralize,
  SwitchItem,
} from "@/widgetLibrary/SwitchGroupWidget/interface"

export const formatSwitchOptions = (
  optionConfigureMode: "dynamic" | "static" = "static",
  manualOptions: SwitchItem[] = [],
  mappedOption: Pluralize<SwitchItem> = {
    labels: [],
    captions: [],
    values: [],
    disableds: [],
  },
) => {
  if (optionConfigureMode === "dynamic") {
    const label = mappedOption.labels ?? []
    const value = mappedOption.values ?? []
    const caption = mappedOption.captions ?? []
    const disabled = mappedOption.disableds ?? []
    const maxLength = Math.max(
      label.length,
      value.length,
      disabled.length,
      caption.length,
    )
    const options: SwitchItem[] = []
    for (let i = 0; i < maxLength; i++) {
      let labelItem = label[i] || value[i] || i
      const valueItem = value[i] || label[i] || i
      const captionItem = caption[i]
      const disabledItem = disabled[i]
      if (typeof labelItem === "object") {
        labelItem = i
      }
      if (!options.find((item) => item.value === valueItem)) {
        options.push({
          label: labelItem,
          caption: safeNodeValue(captionItem),
          value: valueItem,
          disabled: disabledItem,
        })
      }
    }
    return options
  } else {
    if (!Array.isArray(manualOptions)) {
      return []
    }
    const options: SwitchItem[] = []
    manualOptions.forEach((option, index) => {
      let labelItem = option.label || option.value || index
      const captionItem = option.caption
      const valueItem = option.value || labelItem || index
      const disabledItem = option.disabled
      if (typeof labelItem === "object") {
        labelItem = index
      }
      if (!options.find((item) => item.value === valueItem)) {
        options.push({
          label: labelItem,
          caption: safeNodeValue(captionItem),
          value: valueItem,
          disabled: disabledItem,
        })
      }
    })
    return options
  }
}

const safeNodeValue = (value: unknown) => {
  return typeof value === "string" ? value : undefined
}
