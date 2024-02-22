// TODO:@aruseito - abstract this function to a common library
export const formatSelectOptions = (
  optionConfigureMode: "dynamic" | "static" = "static",
  manualOptions: {
    label: string
    value: string | number
    disabled?: boolean
  }[] = [],
  mappedOption: {
    labels: string[]
    values: any[]
    disables: boolean[]
  } = {
    labels: [],
    values: [],
    disables: [],
  },
) => {
  if (optionConfigureMode === "dynamic") {
    const label = mappedOption.labels ?? []
    const value = mappedOption.values ?? []
    const disabled = mappedOption.disables ?? []
    const maxLength = Math.max(label.length, value.length, disabled.length)
    const options: {
      label: string
      value: string | number
      disabled?: boolean
    }[] = []
    for (let i = 0; i < maxLength; i++) {
      let labelItem = label[i] || value[i] || i
      const valueItem = value[i] || label[i] || i
      const disabledItem = disabled[i]
      if (typeof labelItem === "object") {
        labelItem = i
      }
      options.push({
        label: labelItem,
        value: valueItem,
        disabled: disabledItem,
      })
    }
    return options
  } else {
    if (!Array.isArray(manualOptions)) {
      return []
    }
    const options: {
      label: string | number
      value: string | number
      disabled?: boolean
    }[] = []
    manualOptions.forEach((option, index) => {
      let labelItem = option.label || option.value || index
      const valueItem = option.value || labelItem || index
      const disabledItem = option.disabled
      if (typeof labelItem === "object") {
        labelItem = index
      }
      options.push({
        label: labelItem,
        value: valueItem,
        disabled: disabledItem,
      })
    })
    return options
  }
}
