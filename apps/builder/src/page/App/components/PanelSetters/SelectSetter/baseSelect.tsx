import { FC } from "react"
import { Select } from "@illa-design/react"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { BaseSelectSetterProps } from "./interface"

export const BaseSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    options,
    attrName,
    handleUpdateDsl,
    value,
    allowClear,
    onChange,
  } = props

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={options}
        size="medium"
        value={value}
        colorScheme="techPurple"
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
          onChange?.(value)
        }}
        allowClear={allowClear}
      />
    </div>
  )
}

BaseSelectSetter.displayName = "BaseSelect"
