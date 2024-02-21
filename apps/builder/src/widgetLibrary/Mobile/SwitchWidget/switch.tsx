import { Switch } from "antd-mobile"
import { FC, useCallback, useEffect } from "react"
import { AutoHeightContainer } from "@/widgetLibrary/PC/PublicSector/AutoHeightContainer"
import { Label } from "@/widgetLibrary/PC/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper"
import { applyCenterLabelAndComponentWrapperStyle } from "@/widgetLibrary/PC/PublicSector/TransformWidgetWrapper/style"
import { SwitchWidgetProps, WrappedSwitchProps } from "./interface"

export const WrappedSwitch: FC<WrappedSwitchProps> = (props) => {
  const { value, disabled, handleUpdateDsl, handleOnChange } = props

  return (
    <Switch
      checked={value}
      disabled={disabled}
      onChange={(value) => {
        handleUpdateDsl({ value })
        handleOnChange()
      }}
    />
  )
}

WrappedSwitch.displayName = "WrappedSwitch"

export const SwitchWidget: FC<SwitchWidgetProps> = (props) => {
  const {
    value,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
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
    updateComponentHeight,
    triggerEventHandler,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
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
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    handleUpdateDsl,
    deleteComponentRuntimeProps,
    value,
  ])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
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
          <WrappedSwitch {...props} handleOnChange={handleOnChange} />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}
SwitchWidget.displayName = "SwitchWidget"
export default SwitchWidget
