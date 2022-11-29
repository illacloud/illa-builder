import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { getPageExecutionResultArray } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseSelectSetterProps } from "./interface"

export const EventTargetPageSelect: FC<BaseSelectSetterProps> = (props) => {
  const { isSetterSingleRow, attrName, handleUpdateDsl, value, placeholder } =
    props
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
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="medium"
        colorScheme="techPurple"
        value={finalValue}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        placeholder={placeholder}
      />
    </div>
  )
}
