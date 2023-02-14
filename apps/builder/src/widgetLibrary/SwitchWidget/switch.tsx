import { FC, useCallback, useEffect, useRef } from "react"
import { Switch } from "@illa-design/react"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyCenterLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { SwitchWidgetProps, WrappedSwitchProps } from "./interface"

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
    updateComponentHeight,
    triggerEventHandler,
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
  }, [
    displayName,
    value,
    disabled,
    colorScheme,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      updateComponentHeight(wrapperRef.current?.clientHeight)
    }
  }, [value, required, labelPosition])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

  return (
    <div ref={wrapperRef}>
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
    </div>
  )
}
SwitchWidget.displayName = "SwitchWidget"
