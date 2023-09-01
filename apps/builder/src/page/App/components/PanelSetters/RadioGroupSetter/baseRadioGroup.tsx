import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC } from "react"
import { RadioGroup } from "@illa-design/react"
import {
  applyRadioGroupWrapperStyle,
  radioGroupStyle,
} from "@/page/App/components/PanelSetters/RadioGroupSetter/style"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BaseRadioGroupProps } from "./interface"

const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const {
    value,
    options,
    isSetterSingleRow,
    attrName,
    widgetType,
    handleUpdateDsl,
  } = props

  return (
    <div css={applyRadioGroupWrapperStyle(isSetterSingleRow)}>
      <RadioGroup
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
            element: "component_inspect_radio",
            parameter1: widgetType,
            parameter2: attrName,
          })
        }}
        forceEqualWidth={true}
        value={value}
        options={options}
        type="button"
        size="small"
        colorScheme="grayBlue"
        css={radioGroupStyle}
      />
    </div>
  )
}

BaseRadioGroupSetter.displayName = "BaseRadioGroupSetter"

export default BaseRadioGroupSetter
