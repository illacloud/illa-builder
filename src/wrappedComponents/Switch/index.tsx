import { Switch } from "@illa-design/switch"
import { FC } from "react"
import { SwitchProps } from "./interface"
import LabelWrapper from "../LabelWrapper"

const WrappedSwitch: FC<SwitchProps> = (props) => {
  const {
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    value,
    disabled,
    required,
    checkedBackgroundColor,
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
      />
    </LabelWrapper>
  )
}

export default WrappedSwitch
