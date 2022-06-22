import { forwardRef, useState } from "react"
import { Input } from "@illa-design/input"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { WrappedInputProps } from "./interface"
import { inputContainerCss } from "./style"

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
    required,
    showCharacterCount,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    tooltipText,
    handleUpdateDsl,
  } = props

  const validateProps: ValidateMessageProps = props
  const [currentValue, setCurrentValue] = useState("")

  return (
    <div>
      <Wrapper w="100%">
        <LabelWrapper
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          tooltipText={tooltipText}
        >
          <div css={inputContainerCss}>
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
            />
            <InvalidMessage value={currentValue} {...validateProps} />
          </div>
        </LabelWrapper>
      </Wrapper>
    </div>
  )
})

export const InputWidget = WrappedInput

WrappedInput.displayName = "WrappedInput"
