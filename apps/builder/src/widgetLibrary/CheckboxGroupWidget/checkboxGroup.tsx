import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { CheckboxGroup } from "@illa-design/react"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyCenterLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"
import {
  CheckboxGroupWidgetProps,
  WrappedCheckboxGroupProps,
} from "./interface"

export const WrappedCheckbox: FC<WrappedCheckboxGroupProps> = (props) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    options,
    handleOnChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
    displayName,
  } = props

  const changeValue = (value?: unknown) => {
    new Promise((resolve) => {
      const message = getValidateMessage(value)
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            value: value || "",
            validateMessage: message,
          },
        },
      ])
      resolve(true)
    }).then(() => {
      handleOnChange?.()
    })
  }

  return (
    <CheckboxGroup
      value={value}
      disabled={disabled}
      options={options}
      direction={direction}
      colorScheme={colorScheme}
      onChange={changeValue}
    />
  )
}

WrappedCheckbox.displayName = "WrappedCheckbox"

export const CheckboxWidget: FC<CheckboxGroupWidgetProps> = (props) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
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
    customRule,
    hideValidationMessage,
    validateMessage,
    updateComponentHeight,
  } = props

  const finalOptions = useMemo(() => {
    return formatSelectOptions(optionConfigureMode, manualOptions, mappedOption)
  }, [optionConfigureMode, manualOptions, mappedOption])

  const getValidateMessage = useCallback(
    (value?: unknown) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [customRule, hideValidationMessage, required],
  )

  const handleValidate = useCallback(
    (value?: unknown) => {
      const message = getValidateMessage(value)
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [getValidateMessage, handleUpdateDsl],
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
        return handleValidate(value)
      },
      clearValidation: () => {},
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    displayName,
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
  }, [validateMessage, finalOptions, labelPosition, updateComponentHeight])

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
          <WrappedCheckbox
            {...props}
            options={finalOptions}
            getValidateMessage={getValidateMessage}
          />
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

CheckboxWidget.displayName = "CheckboxWidget"
