import { Input, InputRef } from "antd-mobile"
import { debounce } from "lodash-es"
import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { AutoHeightContainer } from "@/widgetLibrary/PC/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PC/PublicSector/InvalidMessage"
import { Label } from "@/widgetLibrary/PC/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PC/PublicSector/TransformWidgetWrapper/style"
import { InputWidgetProps, WrappedInputProps } from "./interface"
import { getValidateMessageFunc } from "./utils"

export const WrappedInput = forwardRef<InputRef, WrappedInputProps>(
  (props, ref) => {
    const {
      type = "input",
      value,
      placeholder,
      disabled,
      readOnly,
      handleOnChange,
      handleOnFocus,
      handleOnBlur,
      allowClear,
      maxLength,
      minLength,
      clearValue,
    } = props

    return (
      <>
        {type === "input" && (
          <Input
            ref={ref}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onClear={clearValue}
            maxLength={maxLength}
            minLength={minLength}
            clearable={allowClear}
          />
        )}
        {type === "password" && (
          <Input
            type="password"
            ref={ref}
            value={value}
            autoComplete="new-password"
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onClear={clearValue}
            maxLength={maxLength}
            minLength={minLength}
            clearable={allowClear}
          />
        )}
        {type === "search" && (
          <Input
            ref={ref}
            inputMode="search"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onClear={clearValue}
            maxLength={maxLength}
            minLength={minLength}
            clearable={allowClear}
          />
        )}
      </>
    )
  },
)
WrappedInput.displayName = "WrappedInput"

export const InputWidget: FC<InputWidgetProps> = (props) => {
  const {
    displayName,
    value,
    handleUpdateDsl,
    minLength,
    maxLength,
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
    pattern,
    regex,
    customRule,
    hideValidationMessage,
    defaultValue,
    updateComponentHeight,
    validateMessage,
    triggerEventHandler,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
  } = props

  const inputRef = useRef<InputRef>(null)

  const [inputValue, setInputValue] = useState<string>(
    value || defaultValue || "",
  )

  useEffect(() => {
    setInputValue(defaultValue)

    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: defaultValue || "",
        },
      },
    ])
  }, [defaultValue, displayName, handleUpdateMultiExecutionResult])

  const handleValidate = useCallback(
    (value?: string) => {
      const message = getValidateMessageFunc(value, {
        hideValidationMessage: hideValidationMessage,
        pattern: pattern,
        regex: regex,
        minLength: minLength,
        maxLength: maxLength,
        required: required,
        customRule: customRule,
      })
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [
      customRule,
      handleUpdateDsl,
      hideValidationMessage,
      maxLength,
      minLength,
      pattern,
      regex,
      required,
    ],
  )

  const debounceOnChange = useRef(
    debounce(
      (
        value: string,
        triggerEventHandler: InputWidgetProps["triggerEventHandler"],
        options?: {
          hideValidationMessage?: InputWidgetProps["hideValidationMessage"]
          pattern?: InputWidgetProps["pattern"]
          regex?: InputWidgetProps["regex"]
          minLength?: InputWidgetProps["minLength"]
          maxLength?: InputWidgetProps["maxLength"]
          required?: InputWidgetProps["required"]
          customRule?: InputWidgetProps["customRule"]
        },
      ) => {
        new Promise((resolve) => {
          const message = getValidateMessageFunc(value, options)
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
          triggerEventHandler("change")
        })
      },
      180,
    ),
  )

  const handleOnChange = useCallback(
    (value: string) => {
      setInputValue(value)
      debounceOnChange.current(value, triggerEventHandler, {
        hideValidationMessage: hideValidationMessage,
        pattern: pattern,
        regex: regex,
        minLength: minLength,
        maxLength: maxLength,
        required: required,
        customRule: customRule,
      })
    },
    [
      customRule,
      hideValidationMessage,
      maxLength,
      minLength,
      pattern,
      regex,
      required,
      triggerEventHandler,
    ],
  )

  const clearValue = useCallback(() => {
    handleOnChange("")
  }, [handleOnChange])

  useEffect(() => {
    updateComponentRuntimeProps({
      focus: () => {
        inputRef.current?.focus()
      },
      setValue: (value: boolean | string | number | void) => {
        if (typeof value === "string") {
          handleOnChange(value)
        }
      },
      clearValue: () => {
        clearValue()
      },
      validate: () => {
        return handleValidate(value)
      },
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
    })

    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    clearValue,
    deleteComponentRuntimeProps,
    handleOnChange,
    handleUpdateDsl,
    handleValidate,
    updateComponentRuntimeProps,
    value,
  ])

  const handleOnFocus = useCallback(() => {
    triggerEventHandler("focus")
  }, [triggerEventHandler])

  const handleOnBlur = useCallback(() => {
    triggerEventHandler("blur")
  }, [triggerEventHandler])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
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
          <WrappedInput
            {...props}
            value={inputValue}
            ref={inputRef}
            handleOnChange={handleOnChange}
            handleOnFocus={handleOnFocus}
            handleOnBlur={handleOnBlur}
            clearValue={clearValue}
          />
        </div>
      </TooltipWrapper>

      {!hideValidationMessage && (
        <div
          css={applyValidateMessageWrapperStyle(
            labelWidth,
            labelPosition,
            labelHidden || !label,
          )}
        >
          <InvalidMessage validateMessage={validateMessage} />
        </div>
      )}
    </AutoHeightContainer>
  )
}

InputWidget.displayName = "InputWidget"
export default InputWidget
