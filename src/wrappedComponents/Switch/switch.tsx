import { Switch } from "@illa-design/switch"
import { FC, forwardRef, useImperativeHandle } from "react"
import { WrappedSwitchProps } from "./interface"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { withParser } from "@/wrappedComponents/parserHOC"

export const WrappedSwitch: FC<WrappedSwitchProps> = forwardRef(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      setValue: (value: boolean) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      toggleValue: () => {
        handleUpdateDsl({ value: !props.checked })
      },
    }))

    const {
      label,
      labelAlign,
      labelWidth,
      labelPosition,
      labelCaption,
      labelWidthUnit,
      checked,
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
          checked={checked}
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

export const SwitchWidget = withParser(WrappedSwitch)
