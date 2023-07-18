import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import { Input, Password, Search } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { InputWidgetProps, WrappedInputProps } from "./interface"

export const WrappedInput = forwardRef<HTMLInputElement, WrappedInputProps>(
  (props, ref) => {
    const {
      type = "input",
      showVisibleButton = true,
      value,
      placeholder,
      disabled,
      readOnly,
      prefixText,
      suffixText,
      showCharacterCount,
      colorScheme,
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
            w="100%"
            inputRef={ref}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            addBefore={prefixText}
            addAfter={suffixText}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            showWordLimit={showCharacterCount}
            colorScheme={colorScheme}
            allowClear={allowClear}
            onClear={clearValue}
            maxLength={maxLength}
            minLength={minLength}
          />
        )}
        {type === "password" && (
          <Password
            w="100%"
            inputRef={ref}
            value={value}
            autoComplete="new-password"
            visibilityToggle={showVisibleButton}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            addBefore={prefixText}
            addAfter={suffixText}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            showWordLimit={showCharacterCount}
            colorScheme={colorScheme}
            allowClear={allowClear}
            onClear={clearValue}
            maxLength={maxLength}
            minLength={minLength}
          />
        )}
        {type === "search" && (
          <Search
            w="100%"
            inputRef={ref}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            addBefore={prefixText}
            addAfter={suffixText}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            showWordLimit={showCharacterCount}
            colorScheme={colorScheme}
            allowClear={allowClear}
            onClear={clearValue}
            maxLength={maxLength}
            minLength={minLength}
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
    updateComponentHeight,
    validateMessage,
    triggerEventHandler,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const getValidateMessage = useCallback(
    (value?: string) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          pattern,
          regex,
          minLength,
          maxLength,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [
      customRule,
      hideValidationMessage,
      maxLength,
      minLength,
      pattern,
      regex,
      required,
    ],
  )

  const handleValidate = useCallback(
    (value?: string) => {
      const message = getValidateMessage(value)
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [getValidateMessage, handleUpdateDsl],
  )
  useEffect(() => {
    updateComponentRuntimeProps({
      focus: () => {
        inputRef.current?.focus()
      },
      setValue: (value: boolean | string | number | void) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
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
    deleteComponentRuntimeProps,
    handleUpdateDsl,
    handleValidate,
    updateComponentRuntimeProps,
    value,
  ])

  const handleOnChange = useCallback(
    (value: string) => {
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
        triggerEventHandler("change")
      })
    },
    [
      displayName,
      getValidateMessage,
      handleUpdateMultiExecutionResult,
      triggerEventHandler,
    ],
  )

  const clearValue = useCallback(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: "",
        },
      },
    ])
  }, [displayName, handleUpdateMultiExecutionResult])

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
            ref={inputRef}
            getValidateMessage={getValidateMessage}
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
