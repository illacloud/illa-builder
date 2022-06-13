import { Switch } from "@illa-design/switch"
import { FC } from "react"
import { SwitchProps } from "./interface"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

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
    handleUpdateDsl,
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
        onChange={(value) => {
          handleUpdateDsl({ value })
        }}
        defaultChecked={defaultValue}
      />
    </LabelWrapper>
  )
}

WrappedSwitch.displayName = "SwitchWidget"

export const SwitchWidget = WrappedSwitch
