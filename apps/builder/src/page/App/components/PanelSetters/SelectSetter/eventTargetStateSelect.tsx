import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getGlobalDataExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseSelectSetter } from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

export const EventtargetStateSelect: FC<BaseSelectSetterProps> = (props) => {
  const { value } = props

  const globalDataResult = useSelector(getGlobalDataExecutionResult)

  const finalOptions = useMemo(() => {
    return Object.keys(globalDataResult).map((key) => ({
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
    <BaseSelectSetter
      {...props}
      value={finalValue as string}
      options={finalOptions}
    />
  )
}
