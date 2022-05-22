import { Switch } from "@illa-design/switch"
import { FC } from "react"
import { SwitchProps } from "./interface"
import LabelWrapper from "../LabelWrapper"
import { withParser } from "../parserHOC"

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

export const SwitchWidget = withParser(WrappedSwitch)
