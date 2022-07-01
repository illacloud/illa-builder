import { forwardRef, useImperativeHandle } from "react"
import { Switch } from "@illa-design/switch"
import LabelWrapper from "@/widgetLibrary/PublicSector/LabelWrapper"
import { WrappedSwitchProps } from "./interface"

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
      styles,
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
          colorScheme={styles?.colorScheme}
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
