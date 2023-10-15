import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC } from "react"
import { Switch } from "@illa-design/react"
import { dynamicWidthStyle } from "@/page/App/components/InspectPanel/PanelSetters/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BaseSwitchProps } from "./interface"
import { setterContainerStyle } from "./style"

const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const {
    value,
    attrName,
    handleUpdateDsl,
    widgetType,
    isSetterSingleRow,
    labelDesc,
    labelName,
    labelSize,
  } = props

  return (
    <div css={setterContainerStyle(isSetterSingleRow)}>
      {labelName && (
        <span>
          <PanelLabel
            labelName={labelName}
            labelDesc={labelDesc}
            labelSize={labelSize}
          />
        </span>
      )}
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
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"

export default BaseSwitchSetter
