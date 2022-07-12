import { FC, forwardRef, useEffect, useRef, useState } from "react"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { InputWidgetProps, WrappedInputProps } from "./interface"

export const WrappedInput = forwardRef<HTMLInputElement, WrappedInputProps>(
  (props, ref) => {
    const {
      value,
      placeholder,
      disabled,
      readOnly,
      prefixIcon,
      prefixText,
      suffixIcon,
      suffixText,
      showCharacterCount,
      colorScheme,
      handleUpdateDsl,
      allowClear,
      pattern,
      regex,
      minLength,
      maxLength,
      required,
      customRule,
      hideValidationMessage,
    } = props

    const [currentValue, setCurrentValue] = useState("")

    return (
      <div css={containerStyle}>
        <Input
          inputRef={ref}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          prefix={prefixIcon}
          addonBefore={prefixText}
          suffix={suffixIcon}
          addonAfter={suffixText}
          onChange={(value) => {
            setCurrentValue(value)
            handleUpdateDsl({ value })
          }}
          showCount={showCharacterCount}
          borderColor={colorScheme}
          allowClear={allowClear}
          onClear={() => {
            setCurrentValue("")
            handleUpdateDsl({ value: "" })
          }}
          maxLength={maxLength}
        />
        <InvalidMessage
          value={currentValue}
          pattern={pattern}
          regex={regex}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          customRule={customRule}
          hideValidationMessage={hideValidationMessage}
        />
      </div>
    )
  },
)
WrappedInput.displayName = "WrappedInput"

export const InputWidget: FC<InputWidgetProps> = (props) => {
  const {
    value,
    placeholder,
    disabled,
    readOnly,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    showCharacterCount,
    colorScheme,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    allowClear,
    pattern,
    regex,
    minLength,
    maxLength,
    required,
    customRule,
    hideValidationMessage,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      placeholder,
      disabled,
      readOnly,
      prefixIcon,
      prefixText,
      suffixIcon,
      suffixText,
      showCharacterCount,
      colorScheme,
      allowClear,
      pattern,
      regex,
      minLength,
      maxLength,
      required,
      customRule,
      hideValidationMessage,
      focus: () => {
        inputRef.current?.focus()
      },
      setValue: (value: boolean | string | number | void) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {},
      clearValidation: () => {},
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    placeholder,
    disabled,
    readOnly,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    showCharacterCount,
    colorScheme,
    displayName,
    allowClear,
    pattern,
    regex,
    minLength,
    maxLength,
    required,
    customRule,
    hideValidationMessage,
  ])
  return <WrappedInput {...props} ref={inputRef} />
}

InputWidget.displayName = "InputWidget"
