import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { getGlobalDataExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseSelectSetterProps } from "./interface"

export const EventtargetStateSelect: FC<BaseSelectSetterProps> = (props) => {
  const { isSetterSingleRow, attrName, handleUpdateDsl, value } = props

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
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="medium"
        colorScheme="techPurple"
        value={finalValue}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
