import { FC } from "react"
import { BaseSwitchProps } from "./interface"
import { Switch } from "@illa-design/switch"
import { dynamicWidthStyle } from "@/page/App/components/PanelSetters/style"

export const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const { defaultValue, attrName, panelConfig, handleUpdateDsl } = props

  return (
    <div css={dynamicWidthStyle}>
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
