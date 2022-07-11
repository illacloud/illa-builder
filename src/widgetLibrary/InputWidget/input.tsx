import { FC, useEffect, useRef, useState } from "react"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { WrappedInputProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedInput: FC<WrappedInputProps> = (props) => {
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
  } = props

  const validateProps: ValidateMessageProps = props
  const [currentValue, setCurrentValue] = useState("")
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
      displayName,
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
  ])

  return (
    <div css={containerStyle}>
      <Input
        inputRef={inputRef}
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
      />
      <InvalidMessage value={currentValue} {...validateProps} />
    </div>
  )
}

export const InputWidget = WrappedInput

WrappedInput.displayName = "WrappedInput"
