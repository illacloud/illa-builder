import { Switch } from "@illa-design/switch"
import { forwardRef, useImperativeHandle } from "react"
import { WrappedSwitchProps } from "./interface"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

export const WrappedSwitch = forwardRef<any, WrappedSwitchProps>(
  (props, ref) => {
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
      disabled,
      required,
      colorScheme = "blue",
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
          colorScheme={colorScheme}
          onChange={(value) => {
            handleOnChange()
            handleUpdateDsl({ value })
          }}
        />
      </LabelWrapper>
    )
  },
)

WrappedSwitch.displayName = "SwitchWidget"

export const SwitchWidget = WrappedSwitch
