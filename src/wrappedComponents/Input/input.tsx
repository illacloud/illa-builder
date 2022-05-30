import { FC, useState } from "react"
import { WrappedInputProps } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { inputContainerCss } from "./style"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { withParser } from "@/wrappedComponents/parserHOC"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

export const WrappedInput: FC<WrappedInputProps> = (props) => {
  const {
    readOnly = true,
    maxLength,
    minLength,
    pattern,
    regex,
    customRule,
    required = true,
    showCharacterCount = true,
    defaultValue,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    tooltipText,
    ...res
  } = props

  const validateProps: ValidateMessageProps = props
  const [currentValue, setCurrentValue] = useState(defaultValue)

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
              onChange={(value) => {
                setCurrentValue(value)
              }}
              {...res}
              showCount={showCharacterCount}
            />
            <InvalidMessage value={currentValue} {...validateProps} />
          </div>
        </LabelWrapper>
      </Wrapper>
    </div>
  )
}
export const InputWidget = withParser(WrappedInput)

WrappedInput.displayName = "WrappedInput"
