import { Switch } from "@illa-design/switch"
import { FC, forwardRef, useImperativeHandle } from "react"
import { SwitchProps } from "./interface"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

export const WrappedSwitch: FC<SwitchProps> = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    setValue: (value: boolean) => {
      handleUpdateDsl({ value })
    },
    clearValue: () => {
      handleUpdateDsl({ value: undefined })
    },
    toggleValue: () => {
      handleUpdateDsl({ value: !props.value })
    },
  }))

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
    handleOnChange,
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
          handleOnChange()
          handleUpdateDsl({ value })
        }}
        defaultChecked={defaultValue}
      />
    </LabelWrapper>
  )
})

WrappedSwitch.displayName = "SwitchWidget"

export const SwitchWidget = WrappedSwitch
