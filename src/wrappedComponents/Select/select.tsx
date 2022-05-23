import { FC } from "react"
import { SelectProps, WrappedSelectProps } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { Select } from "@illa-design/select"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { withParser } from "@/wrappedComponents/parserHOC"

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
    tooltipText,
  } = props
  const selectProps: SelectProps = props
  return (
    <Wrapper>
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
        <Select allowClear={showClear} {...selectProps} size="small" />
      </LabelWrapper>
    </Wrapper>
  )
}

WrappedSelect.displayName = "SelectWidget"

export const SelectWidget = withParser(WrappedSelect)
