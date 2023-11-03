import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getGlobalDataExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseSelectSetterProps } from "./interface"
import SearchSelectSetter from "./searchSelect"

const EventtargetStateSelect: FC<BaseSelectSetterProps> = (props) => {
  const { value } = props

  const globalDataResult = useSelector(getGlobalDataExecutionResult)

  const finalOptions = useMemo(() => {
    return Object.keys(globalDataResult)
      .filter((key) => !key.startsWith("$"))
      .map((key) => ({
        label: key,
        value: key,
      }))
  }, [globalDataResult])

  const finalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option.value === value
    })
    if (index !== -1) return value
    return undefined
  }, [finalOptions, value])

  return (
    <SearchSelectSetter
      {...props}
      value={finalValue as string}
      options={finalOptions}
    />
  )
}

EventtargetStateSelect.displayName = "EventtargetStateSelect"

export default EventtargetStateSelect
