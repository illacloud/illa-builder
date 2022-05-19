import { Switch } from "@illa-design/switch"
import { FC } from "react"
import { SwitchProps } from "./interface"
import LabelWrapper from "../LabelWrapper"
import { withParser } from "../parserHOC"

export const SWITCH_WIDGET_CONFIG = {
  type: "SWITCH_WIDGET",
  defaults: {
    rows: 50,
    columns: 500,
    widgetName: "switch",
    version: "0.0.1",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
  },
}

export const WrappedSwitch: FC<SwitchProps> = (props) => {
  const {
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    value,
    defaultValue,
    disabled,
    required,
    checkedBackgroundColor = "blue",
    tooltipText,
    onChange,
  } = props
  return (
    <LabelWrapper
      label={label}
      labelAlign={labelAlign}
      labelWidth={labelWidth}
      labelCaption={labelCaption}
      labelWidthUnit={labelWidthUnit}
      labelPosition={labelPosition}
      required={required}
      tooltipText={tooltipText}
    >
      <Switch
        checked={value}
        disabled={disabled}
        colorScheme={checkedBackgroundColor}
        onChange={onChange}
        defaultChecked={defaultValue}
      />
    </LabelWrapper>
  )
}

export default withParser(WrappedSwitch)
