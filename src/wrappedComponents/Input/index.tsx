import { FC, useMemo, useRef, useState } from "react"

import { WrappedInputProps } from "./interface"
import Label from "../Label"
import { Wrapper } from "../Wrapper"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "../InValidMessage"
import { inputContainerCss } from "./style"
import { ValidateMessageProps } from "../InvalidMessage/interface"

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
    ...res
  } = props

  const validateProps: ValidateMessageProps = props
  const [currentValue, setCurrentValue] = useState(defaultValue)

  return (
    <div>
      <Wrapper w={"300px"}>
        <Label label="input" labelPosition={"left"} required={required} />
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
      </Wrapper>
    </div>
  )
}
WrappedInput.displayName = "WrappedInput"
