import { FC } from "react"
import { WrappedSelectProps } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { Select } from "@illa-design/select"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

export const WrappedSelect: FC<WrappedSelectProps> = (props) => {
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
    showClear,
    handleUpdateDsl,
    ...selectProps
  } = props
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
        <Select
          allowClear={showClear}
          {...selectProps}
          size="small"
          onChange={(value) => {
            handleUpdateDsl({ value })
          }}
        />
      </LabelWrapper>
    </Wrapper>
  )
}

WrappedSelect.displayName = "SelectWidget"

export const SelectWidget = WrappedSelect
