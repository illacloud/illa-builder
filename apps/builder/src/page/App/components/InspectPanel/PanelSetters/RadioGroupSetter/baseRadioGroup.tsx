import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC } from "react"
import { RadioGroup } from "@illa-design/react"
import {
  applyRadioGroupWrapperStyle,
  baseRadioGroupContainerStyle,
  radioGroupStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/RadioGroupSetter/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BaseRadioGroupProps } from "./interface"

const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const {
    value,
    options,
    defaultValue,
    isSetterSingleRow = false,
    attrName,
    widgetType,
    labelName,
    labelDesc,
    handleUpdateDsl,
  } = props

  return (
    <div css={baseRadioGroupContainerStyle(isSetterSingleRow)}>
      {labelName && (
        <span>
          <PanelLabel
            labelName={labelName}
            labelDesc={labelDesc}
            labelSize="medium"
          />
        </span>
      )}
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
          defaultValue={defaultValue}
          options={options}
          type="button"
          size="medium"
          colorScheme="grayBlue"
          css={radioGroupStyle}
        />
      </div>
    </div>
  )
}

BaseRadioGroupSetter.displayName = "BaseRadioGroupSetter"

export default BaseRadioGroupSetter
