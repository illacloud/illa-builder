import { FC } from "react"
import { Switch } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { dynamicWidthStyle } from "@/page/App/components/PanelSetters/style"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BaseSwitchProps } from "./interface"

export const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const { value, attrName, handleUpdateDsl, widgetType } = props

  return (
    <div css={dynamicWidthStyle}>
      <Switch
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
            element: "component_inspect_radio",
            parameter1: widgetType,
            parameter2: attrName,
          })
        }}
        checked={value}
        colorScheme="techPurple"
      />
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"
