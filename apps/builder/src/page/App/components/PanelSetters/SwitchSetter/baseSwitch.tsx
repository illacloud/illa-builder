import { BaseSwitchProps } from "./interface"
import { dynamicWidthStyle } from "@/page/App/components/PanelSetters/style"
import { Switch } from "@illa-design/react"
import { FC } from "react"

export const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const { value, attrName, handleUpdateDsl } = props

  return (
    <div css={dynamicWidthStyle}>
      <Switch
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        checked={value}
        colorScheme="purple"
      />
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"
