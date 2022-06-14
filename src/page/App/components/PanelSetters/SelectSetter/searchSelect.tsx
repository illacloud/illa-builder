import { FC } from "react"
import { Select } from "@illa-design/select"
import { applySetterStyle } from "@/page/App/components/PanelSetters/style"
import { BaseSelectSetterProps } from "./interface"

export const SearchSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const {
    isFullWidth,
    options,
    defaultValue,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdatePanelConfig,
  } = props

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <Select
        showSearch={true}
        allowClear
        options={options}
        size="small"
        value={panelConfig[attrName] ?? defaultValue}
        onChange={(value) => {
          handleUpdatePanelConfig({ [attrName]: value })
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}
