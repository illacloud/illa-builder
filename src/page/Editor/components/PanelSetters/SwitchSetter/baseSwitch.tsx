import { FC } from "react"
import { BaseSwitchProps } from "./interface"
import { Switch } from "@illa-design/switch"
import { applySetterStyle } from "@/page/Editor/components/PanelSetters/style"

export const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const {
    defaultValue,
    isFullWidth,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdateConfigPanel,
  } = props

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <Switch
        onChange={(value) => {
          handleUpdateConfigPanel({ [attrName]: value })
          handleUpdateDsl({ [attrName]: value })
        }}
        checked={panelConfig[attrName] ?? defaultValue}
        colorScheme="purple"
      />
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"
