import { FC } from "react"
import { SelectProps, WrappedSelectProps } from "./interface"
import { Wrapper } from "../Wrapper"
import { Select } from "@illa-design/select"
import LabelProps from "../Label/interface"
import Label from "../Label"

export const WrappedSelect: FC<WrappedSelectProps> = (props) => {
  const { optionConfigureMode, showClear } = props
  const labelProps: LabelProps = props
  const selectProps: SelectProps = props
  return (
    <Wrapper>
      <Label {...labelProps} />
      <Select allowClear={showClear} {...selectProps} />
    </Wrapper>
  )
}
