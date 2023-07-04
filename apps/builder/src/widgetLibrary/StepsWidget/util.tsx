import { StepItem, Trigger, isArray, isObject } from "@illa-design/react"
import {
  StepsMappedOptionType,
  StepsOptionsType,
} from "@/widgetLibrary/StepsWidget/interface"

const spliceArrayItem = (arr: any[], index: number) => {
  arr.length >= index && arr.splice(index, 1)
}

export const getFormatOptionConfigData = (
  optionConfigureMode: "dynamic" | "static",
  list?: StepsOptionsType[] | StepsMappedOptionType,
) => {
  const isMappedOption = optionConfigureMode === "dynamic"
  if (!list) {
    return isMappedOption
      ? { labels: [], values: [], captions: [], tooltips: [], hiddens: [] }
      : []
  }
  if (!isMappedOption && isArray(list)) {
    const filteredManualOptions = list.filter((option: any) => !option?.hidden)
    const filteredManualOptionsValueMap: StepsOptionsType[] = []
    return filteredManualOptions.filter((option: any) => {
      if (!filteredManualOptionsValueMap.includes(option?.value)) {
        filteredManualOptionsValueMap.push(option?.value)
        return true
      }
      return false
    })
  }
  const {
    labels = [],
    values = [],
    captions = [],
    tooltips = [],
    hiddens = [],
  } = list as StepsMappedOptionType

  let newHiddens = [...hiddens]
  const newLabels = [...labels]
  const newValues = [...values]
  const newCaptions = [...captions]
  const newTooltips = [...tooltips]

  newHiddens = newHiddens.filter((item, index) => {
    if (item) {
      ;[newLabels, newValues, newCaptions, newTooltips].forEach((arr) =>
        spliceArrayItem(arr, index),
      )
    }
    return !item
  })
  const uniqueValues = newValues.filter((item, index) => {
    const isUnique = newValues.indexOf(item) === index
    if (!isUnique) {
      ;[newLabels, newHiddens, newCaptions, newTooltips].forEach((arr) =>
        spliceArrayItem(arr, index),
      )
    }
    return isUnique
  })
  return {
    labels: newLabels,
    values: uniqueValues,
    captions: newCaptions,
    tooltips: newTooltips,
    hiddens: newHiddens,
  }
}

export const getStepItemTitle = (title: any, tooltip?: any) => {
  const titleContent = title
  return !!tooltip ? (
    <Trigger
      trigger="hover"
      colorScheme="grayBlue"
      position="top-start"
      showArrow={false}
      content={<>{tooltip}</>}
    >
      <div>{titleContent}</div>
    </Trigger>
  ) : (
    titleContent
  )
}

export const formatStepsData = (
  optionConfigureMode: "dynamic" | "static",
  formatOptionConfigData: StepsOptionsType[] | StepsMappedOptionType,
  disabled?: boolean,
) => {
  if (optionConfigureMode === "static") {
    const uniqueManualOptions = formatOptionConfigData as StepsOptionsType[]
    const results = uniqueManualOptions.map((option, index) => {
      const { label, value, caption, tooltip = "" } = option
      const titleContent = label || value || index
      return {
        title: getStepItemTitle(titleContent, tooltip),
        description: caption,
        disabled,
      }
    })
    return {
      items: results,
      uniqueOptions: uniqueManualOptions.map((item) => item.value),
    }
  }
  const mappedData = formatOptionConfigData as StepsMappedOptionType
  const labels = mappedData?.labels || []
  const values = mappedData?.values || []
  const captions = mappedData?.captions || []
  const tooltips = mappedData?.tooltips || []
  const hiddens = mappedData?.hiddens || []
  const maxLength = Math.max(
    labels.length,
    values.length,
    captions.length,
    tooltips.length,
    hiddens.length,
  )
  const uniqueValues: any[] = []
  const result: StepItem[] = []
  for (let i = 0; i < maxLength; i++) {
    let titleContent = labels[i] || values[i] || i
    if (isObject(titleContent)) {
      titleContent = i
    }
    const caption = isObject(captions[i]) ? "" : captions[i]
    const tips = isObject(tooltips[i]) ? "" : tooltips[i]
    result.push({
      title: getStepItemTitle(titleContent, tips),
      description: <>{caption}</>,
    })
    uniqueValues.push(values[i])
  }
  return { items: result, uniqueOptions: uniqueValues }
}
