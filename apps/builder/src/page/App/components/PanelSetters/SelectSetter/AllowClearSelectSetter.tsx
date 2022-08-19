import { FC } from "react"
import { Select } from "@illa-design/select"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"

export const AllowClearSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const { isSetterSingleRow, options, attrName, handleUpdateDsl, value } = props

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={options}
        size="medium"
        value={value}
        allowClear
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}

AllowClearSelectSetter.displayName = "BaseSelect"
