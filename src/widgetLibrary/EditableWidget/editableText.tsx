import { FC, useEffect, useRef, useState } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { EditableTextWidgetProps, WrappedEditableTextProps } from "./interface"
import { applyTextCss } from "./style"

export const WrappedEditableText: FC<WrappedEditableTextProps> = (props) => {
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
    maxLength,
    minLength,
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
          minLength={minLength}
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
    </div>
  )
}
WrappedEditableText.displayName = "WrappedEditableText"

export const EditableTextWidget: FC<EditableTextWidgetProps> = (props) => {
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
    minLength,
    maxLength,
    allowClear,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateDsl,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
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
      minLength,
      maxLength,
      allowClear,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
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
    minLength,
    maxLength,
    allowClear,
  ])
  return <WrappedEditableText {...props} />
}
EditableTextWidget.displayName = "EditableTextWidget"
