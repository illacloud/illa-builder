import { FC } from "react"
import { SelectProps } from "./interface"
import { Wrapper } from "../Wrapper"
import { Select } from "@illa-design/select"
import LabelProps from "../Label/interface"
import Label from "../Label"

export const WrappedSelect: FC<SelectProps> = (props) => {
  const { optionConfigureMode, showClear, showSearch, ...res } = props
  const labelProps: LabelProps = props
  return (
    <Wrapper>
      <Label {...labelProps} />
      <Select allowClear={showClear} showSearch={showSearch} {...res} />
    </Wrapper>
  )
}
