import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { Select } from "@illa-design/select"
import { SelectWidgetProps, WrappedSelectProps } from "./interface"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"

export const WrappedSelect: FC<WrappedSelectProps> = (props) => {
  const {
    showClear,
    value,
    options,
    placeholder,
    disabled,
    loading,
    readOnly,
    showSearch,
    inputValue,
    colorScheme,
    handleUpdateDsl,
  } = props

  return (
    <Select
      allowClear={showClear}
      options={options}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      loading={loading}
      readOnly={readOnly}
      showSearch={showSearch}
      inputValue={inputValue}
      colorScheme={colorScheme}
      onChange={(value) => {
        handleUpdateDsl({ value })
      }}
    />
  )
}

WrappedSelect.displayName = "WrappedSelect"

export const SelectWidget: FC<SelectWidgetProps> = (props) => {
  const {
    showClear,
    value,
    placeholder,
    disabled,
    loading,
    readOnly,
    showSearch,
    inputValue,
    colorScheme,
    optionConfigureMode,
    mappedOption,
    manualOptions,
    displayName,
    handleUpdateDsl,
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
    (value?: unknown) => {
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
    handleUpdateGlobalData?.(displayName, {
      showClear,
      value,
      placeholder,
      disabled,
      loading,
      readOnly,
      showSearch,
      inputValue,
      colorScheme,
      optionConfigureMode,
      mappedOption,
      manualOptions,
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
    finalOptions,
    showClear,
    value,
    placeholder,
    disabled,
    loading,
    readOnly,
    showSearch,
    inputValue,
    colorScheme,
    optionConfigureMode,
    mappedOption,
    manualOptions,
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
          <WrappedSelect {...props} options={finalOptions} />
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
SelectWidget.displayName = "SelectWidget"
