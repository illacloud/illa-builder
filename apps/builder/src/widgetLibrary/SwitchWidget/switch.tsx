import { FC, useEffect } from "react"
import { Switch } from "@illa-design/switch"
import { SwitchWidgetProps, WrappedSwitchProps } from "./interface"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { applyCenterLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedSwitch: FC<WrappedSwitchProps> = (props) => {
  const { value, disabled, colorScheme, handleUpdateDsl, handleOnChange } =
    props

  return (
    <Switch
      checked={value}
      alignSelf="center"
      disabled={disabled}
      colorScheme={colorScheme}
      onChange={(value) => {
        handleOnChange()
        handleUpdateDsl({ value })
      }}
    />
  )
}

WrappedSwitch.displayName = "WrappedSwitch"

export const SwitchWidget: FC<SwitchWidgetProps> = (props) => {
  const {
    value,
    disabled,
    colorScheme,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    labelPosition,
    labelFull,
    label,
    labelAlign,
    labelWidth = 33,
    labelCaption,
    labelWidthUnit,
    required,
    labelHidden,
    tooltipText,
  } = props

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      disabled,
      colorScheme,
      setValue: (value: boolean) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: false })
      },
      toggle: () => {
        handleUpdateDsl({ value: !value })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, value, disabled, colorScheme])
  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={applyCenterLabelAndComponentWrapperStyle(labelPosition)}>
        <Label
          labelFull={labelFull}
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          labelHidden={labelHidden}
          hasTooltip={!!tooltipText}
        />
        <WrappedSwitch {...props} />
      </div>
    </TooltipWrapper>
  )
}
SwitchWidget.displayName = "SwitchWidget"
