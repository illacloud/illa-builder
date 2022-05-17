import { FC, useMemo } from "react"
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
    handleChangeTextValue,
    handleChangeTextMode,
  } = props

  return (
    <div>
      <RadioGroupSetter
        labelName={labelName}
        labelDesc={labelDesc}
        handleChange={handleChangeTextMode}
        options={options}
        defaultValue={defaultTextModelValue}
      />
      <Input onChange={handleChangeTextValue} defaultValue={defaultTextValue} />
    </div>
  )
}

export default TextValueSetter
