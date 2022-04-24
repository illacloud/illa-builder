import { FC, useMemo, useState } from "react"
import { Input } from "@illa-design/input"
import { ISimpleInputProps } from "./interface"
import Label from "./label"
import {
  singleWrapperCss,
  doubleWrapperCss,
  labelWrapper,
  inputWrapper,
} from "./style"
const SimpleInput: FC<ISimpleInputProps> = (props) => {
  const {
    value: defaultValue,
    labelName,
    labelDesc,
    placeholder,
    isDoubleRow,
  } = props

  const [simpleValue, setSimpleValue] = useState(defaultValue)

  const handleChange = (value: string) => {
    console.log(value)
    setSimpleValue(value)
  }

  const renderSingle = useMemo(() => {
    return (
      <div css={singleWrapperCss}>
        <div>
          <Label labelName={labelName} labelDesc={labelDesc} />
        </div>
        <div css={inputWrapper}>
          <Input
            borderColor="purple"
            placeholder={placeholder}
            value={simpleValue}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  }, [labelDesc, labelName, placeholder, simpleValue])

  const renderDouble = useMemo(() => {
    return (
      <div css={doubleWrapperCss}>
        <div css={labelWrapper}>
          <Label labelName={labelName} labelDesc={labelDesc} />
        </div>
        <div>
          <Input
            borderColor="purple"
            placeholder={placeholder}
            value={simpleValue}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  }, [labelDesc, labelName, simpleValue, placeholder])

  return <>{isDoubleRow ? renderDouble : renderSingle}</>
}

export default SimpleInput
