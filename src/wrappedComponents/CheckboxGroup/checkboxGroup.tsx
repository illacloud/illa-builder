import { CheckboxGroup } from "@illa-design/checkbox"
import { FC } from "react"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { WrappedCheckboxGroupProps } from "./interface"
import { withParser } from "@/wrappedComponents/parserHOC"

const WrappedCheckbox: FC<WrappedCheckboxGroupProps> = (props) => {
  const {
    label,
    labelPosition,
    labelWidth,
    labelWidthUnit,
    labelCaption,
    labelAlign,
    tooltipText,
    value,
    defaultValue,
    disabled,
    options,
    direction,
    handleUpdateDsl,
  } = props
  return (
    <LabelWrapper
      label={label}
      labelAlign={labelAlign}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      labelWidthUnit={labelWidthUnit}
      labelCaption={labelCaption}
      tooltipText={tooltipText}
    >
      <CheckboxGroup
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        options={options}
        direction={direction}
        onChange={(value) => {
          handleUpdateDsl({ value })
        }}
      />
    </LabelWrapper>
  )
}

WrappedCheckbox.displayName = "RadioGroupWidget"

export const CheckboxWidget = withParser(WrappedCheckbox)
