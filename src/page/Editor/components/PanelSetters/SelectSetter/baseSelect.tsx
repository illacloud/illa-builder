import { FC, useMemo } from "react"
import { Select } from "@illa-design/select"
import { applySetterStyle } from "@/page/Editor/components/PanelSetters/style"
import { BaseSelectSetterProps } from "./interface"
import { PanelLabel } from "@/page/Editor/components/InspectPanel/label"

export const BaseSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isFullWidth,
    options,
    defaultValue,
    useCustomLabel,
    labelName,
    attrName,
    labelDesc,
    panelConfig,
    handleUpdateDsl,
    handleUpdatePanelConfig,
    allowClear,
  } = props

  const _options = useMemo(() => {
    return options ?? panelConfig[`${attrName}_options`]
  }, [options, panelConfig[`${attrName}_options`]])

  console.log("BaseSelect", attrName, _options, panelConfig)

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <Select
        allowClear={allowClear}
        options={_options}
        size="small"
        colorScheme={"techPurple"}
        value={panelConfig[attrName] ?? defaultValue}
        onChange={(value) => {
          handleUpdatePanelConfig({ [attrName]: value })
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}
