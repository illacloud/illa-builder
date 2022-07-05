import { forwardRef, useState } from "react"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { WrappedInputProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

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
  } = props

  const validateProps: ValidateMessageProps = props
  const [currentValue, setCurrentValue] = useState("")

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
          setCurrentValue(value)
          handleUpdateDsl({ value })
        }}
        showCount={showCharacterCount}
        borderColor={colorScheme}
      />
      <InvalidMessage value={currentValue} {...validateProps} />
    </div>
  )
})

export const InputWidget = WrappedInput

WrappedInput.displayName = "WrappedInput"
