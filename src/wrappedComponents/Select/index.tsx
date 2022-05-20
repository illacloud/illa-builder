import { FC } from "react"
import { SelectProps, WrappedSelectProps } from "./interface"
import { Wrapper } from "../Wrapper"
import { Select } from "@illa-design/select"
import Label from "../Label"

export const WrappedSelect: FC<WrappedSelectProps> = (props) => {
  const { optionConfigureMode, showClear } = props
  const {
    label,
    labelAlign,
    labelCaption,
    labelPosition,
    labelWidth,
    labelWidthUnit,
    required,
    hidden,
  } = props
  const selectProps: SelectProps = props
  return (
    <Wrapper>
      <Label
        label={label}
        labelAlign={labelAlign}
        labelCaption={labelCaption}
        labelPosition={labelPosition}
        labelWidth={labelWidth}
        labelWidthUnit={labelWidthUnit}
        required={required}
        hidden={hidden}
      />
      <Select allowClear={showClear} {...selectProps} />
    </Wrapper>
  )
}
