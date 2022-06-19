import { FC } from "react"
import { Select } from "@illa-design/select"
import { BaseSelectSetterProps } from "./interface"
import { BaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"

export const BaseSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    options,
    defaultValue,
    attrName,
    panelConfig,
    handleUpdateDsl,
  } = props

  return (
    <div css={BaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={options}
        size="small"
        value={panelConfig[attrName] ?? defaultValue}
        onChange={(value) => {
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}
