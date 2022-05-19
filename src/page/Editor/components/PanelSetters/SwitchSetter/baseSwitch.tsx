import { FC, useContext } from "react"
import { BaseSwitchProps } from "./interface"
import { Switch } from "@illa-design/switch"
import { ConfigPanelContext } from "@/page/Editor/components/InspectPanel/context"
import { applySetterStyle } from "../style"

const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const { defaultValue, isFullWidth, attrName } = props

  const { tempProps, handleUpdateDsl } = useContext(ConfigPanelContext)

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <Switch
        onChange={(value) => handleUpdateDsl({ [attrName]: value })}
        checked={tempProps[attrName] ?? defaultValue}
        colorScheme="purple"
      />
    </div>
  )
}

export default BaseSwitchSetter
