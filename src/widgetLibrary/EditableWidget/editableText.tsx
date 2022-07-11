import { forwardRef, useRef, useState } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { WrappedEditableTextProps } from "./interface"
import { applyTextCss } from "./style"

export const WrappedEditableText = forwardRef<any, WrappedEditableTextProps>(
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
      pattern,
      regex,
      minLength,
      maxLength,
      required,
      customRule,
      hideValidationMessage,
      allowClear,
    } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState(false)

    return (
      <div css={containerStyle}>
        {focus ? (
          <Input
            autoFocus
            onChange={(value) => {
              handleUpdateDsl({ value })
            }}
            showCount={showCharacterCount}
            onBlur={() => {
              setFocus(false)
            }}
            value={value}
            addonAfter={{ render: suffixText }}
            addonBefore={{ render: prefixText }}
            suffix={{ render: suffixIcon }}
            prefix={{ render: prefixIcon }}
            ref={inputRef}
            readOnly={readOnly}
            allowClear={allowClear}
            placeholder={placeholder}
            disabled={disabled}
            borderColor={colorScheme}
            maxLength={maxLength}
            onClear={() => handleUpdateDsl({ value: "" })}
          />
        ) : (
          <span
            css={applyTextCss(!!(value && value?.length > 0))}
            onClick={() => {
              setFocus(true)
            }}
          >
            {value && value?.length > 0 ? value : placeholder}
            <PenIcon />
          </span>
        )}

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
  },
)

export const EditableTextWidget = WrappedEditableText
WrappedEditableText.displayName = "WrappedEditableText"
