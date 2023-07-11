import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getPageExecutionResultArray } from "@/redux/currentApp/executionTree/executionSelector"
import BaseSelectSetter from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

const EventTargetPageSelect: FC<BaseSelectSetterProps> = (props) => {
  const { value } = props
  const pageArray = useSelector(getPageExecutionResultArray)

  const finalOptions = useMemo(() => {
    const tmpOptions: { label: string; value: string }[] = []
    pageArray.forEach((pageNode) => {
      tmpOptions.push({
        label: pageNode.displayName,
        value: pageNode.displayName,
      })
    })
    return tmpOptions
  }, [pageArray])

  const finalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option.value === value
    })
    if (index !== -1) return value
    return undefined
  }, [finalOptions, value])

  return (
    <BaseSelectSetter
      {...props}
      value={finalValue as string}
      options={finalOptions}
    />
  )
}

EventTargetPageSelect.displayName = "EventTargetPageSelect"
export default EventTargetPageSelect
