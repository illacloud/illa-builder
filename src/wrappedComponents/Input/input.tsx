import { forwardRef, useState } from "react"
import { WrappedInputProps } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { inputContainerCss } from "./style"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

export const WrappedInput = forwardRef<any, WrappedInputProps>((props, any) => {
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
