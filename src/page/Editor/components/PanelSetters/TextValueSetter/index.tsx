import { FC } from "react"
import { Input } from "@illa-design/input"
import RadioGroupSetter from "../RadioGroupSetter"
import { TextValueSetterProps } from "./interface"

const options = [
  {
    label: <div>Markdown</div>,
    value: true,
  },
  {
    label: <div>Plain Text</div>,
    value: false,
  },
]

const TextValueSetter: FC<TextValueSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    defaultTextValue,
    defaultTextModelValue,
    handleChange,
  } = props

  return (
    <div>
      <RadioGroupSetter
        labelName={labelName}
        labelDesc={labelDesc}
        handleChange={(value) => handleChange(value, "disabledMarkDown")}
        options={options}
        defaultValue={defaultTextModelValue}
      />
      <Input
        onChange={(value) => handleChange(value, "value")}
        defaultValue={defaultTextValue}
      />
    </div>
  )
}

export default TextValueSetter
