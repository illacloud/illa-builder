import { FC } from "react"
import { BaseSwitchProps } from "./interface"
import { Switch } from "@illa-design/switch"
import { applyDynamicWidthStyle } from "@/page/App/components/PanelSetters/style"

export const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const { defaultValue, attrName, panelConfig, handleUpdateDsl } = props

  return (
    <div css={applyDynamicWidthStyle}>
      <Switch
        onChange={(value) => {
          handleUpdateDsl({ [attrName]: value })
        }}
        checked={panelConfig[attrName] ?? defaultValue}
        colorScheme="purple"
      />
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"
