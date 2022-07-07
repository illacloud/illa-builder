export const formatSelectOptions = (
  optionConfigureMode: "dynamic" | "static" = "static",
  manualOptions: {
    label: string
    value: string | number
    disabled?: boolean
    extra?: any
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
      extra?: any
    }[] = []
    for (let i = 0; i < maxLength; i++) {
      const labelItem = label[i] || value[i] || i
      const valueItem = value[i] || label[i] || i
      const disabledItem = !!disabled[i]
      options.push({
        label: labelItem,
        value: valueItem,
        disabled: disabledItem,
      })
    }
    return options
  } else {
    return manualOptions ?? []
  }
}
