import { FC } from "react"
import { Switch } from "@illa-design/react"
import { dynamicWidthStyle } from "@/page/App/components/PanelSetters/style"
import { BaseSwitchProps } from "./interface"

export const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const { value, attrName, handleUpdateDsl } = props

  return (
    <div css={dynamicWidthStyle}>
      <Switch
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        checked={value}
        colorScheme="techPurple"
      />
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"
