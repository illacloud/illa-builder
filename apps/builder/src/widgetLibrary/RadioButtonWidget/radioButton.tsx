import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { RadioGroup } from "@illa-design/radio"
import { RadioButtonWidgetProps, WrappedRadioButtonProps } from "./interface"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"

export const WrappedRadioButton: FC<WrappedRadioButtonProps> = (props) => {
  const { value, options, disabled, direction, colorScheme, handleUpdateDsl } =
    props

  return (
    <RadioGroup
      w="100%"
      minW="0"
      type="button"
      value={value}
      disabled={disabled}
      options={options}
      direction={direction}
      colorScheme={colorScheme}
      onChange={(value) => {
        handleUpdateDsl({ value })
      }}
    />
  )
}

WrappedRadioButton.displayName = "WrappedRadioButton"

export const RadioButtonWidget: FC<RadioButtonWidgetProps> = (props) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    handleUpdateDsl,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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
    customRule,
    hideValidationMessage,
    validateMessage,
    updateComponentHeight,
  } = props

  const finalOptions = useMemo(() => {
    return formatSelectOptions(optionConfigureMode, manualOptions, mappedOption)
  }, [optionConfigureMode, manualOptions, mappedOption])

  const handleValidate = useCallback(
    (value?: string) => {
      const message = handleValidateCheck({
        value,
        required,
        customRule,
      })
      const showMessage =
        !hideValidationMessage && message && message.length > 0
      if (showMessage) {
        handleUpdateDsl({
          validateMessage: message,
        })
      } else {
        handleUpdateDsl({
          validateMessage: "",
        })
      }
    },
    [customRule, handleUpdateDsl, hideValidationMessage, required],
  )
  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      disabled,
      direction,
      colorScheme,
      optionConfigureMode,
      manualOptions,
      mappedOption,
      options: finalOptions,
      setValue: (value: any) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {
        handleValidate(value)
      },
      clearValidation: () => {},
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    finalOptions,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
  ])

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      updateComponentHeight(wrapperRef.current?.clientHeight)
    }
  }, [value, required, labelPosition])

  return (
    <div ref={wrapperRef}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={applyLabelAndComponentWrapperStyle(labelPosition)}>
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
          <WrappedRadioButton {...props} options={finalOptions} />
        </div>
      </TooltipWrapper>
      <div
        css={applyValidateMessageWrapperStyle(
          labelWidth,
          labelPosition,
          labelHidden || !label,
        )}
      >
        <InvalidMessage validateMessage={validateMessage} />
      </div>
    </div>
  )
}
RadioButtonWidget.displayName = "RadioButtonWidget"
