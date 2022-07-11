import { forwardRef } from "react"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { WrappedInputProps } from "./interface"

export const WrappedInput = forwardRef<any, WrappedInputProps>((props, ref) => {
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

  return (
    <div css={containerStyle}>
      <Input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        prefix={prefixIcon}
        addonBefore={prefixText}
        suffix={suffixIcon}
        addonAfter={suffixText}
        onChange={(value) => {
          handleUpdateDsl({ value })
        }}
        showCount={showCharacterCount}
        borderColor={colorScheme}
        allowClear={allowClear}
        onClear={() => handleUpdateDsl({ value: "" })}
        maxLength={maxLength}
      />
      <InvalidMessage
        value={value}
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
})

export const InputWidget = WrappedInput

WrappedInput.displayName = "WrappedInput"
