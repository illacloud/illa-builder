import { FC } from "react"
import { Select } from "@illa-design/select"
import { applySetterStyle } from "@/page/Editor/components/PanelSetters/style"
import { BaseSelectSetterProps } from "./interface"

export const BaseSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isFullWidth,
    options,
    defaultValue,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdateConfigPanel,
  } = props

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <Select
        options={options}
        size="small"
        value={panelConfig[attrName] ?? defaultValue}
        onChange={(value) => {
          handleUpdateConfigPanel({ [attrName]: value })
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}
