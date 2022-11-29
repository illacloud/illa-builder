import { FC } from "react"
import { Select } from "@illa-design/react"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"

export const SearchSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const { isSetterSingleRow, options, attrName, handleUpdateDsl, value } = props

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        showSearch={true}
        allowClear
        options={options}
        size="medium"
        colorScheme="techPurple"
        value={value}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
