import { FC } from "react"
import { BaseSwitchProps } from "./interface"
import { Switch } from "@illa-design/switch"
import { applySetterStyle } from "@/page/App/components/PanelSetters/style"

export const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const {
    defaultValue,
    isFullWidth,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdatePanelConfig,
  } = props

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <Switch
        onChange={(value) => {
          handleUpdatePanelConfig({ [attrName]: value })
          handleUpdateDsl({ [attrName]: value })
        }}
        checked={panelConfig[attrName] ?? defaultValue}
        colorScheme="purple"
      />
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"
