import { RadioGroup } from "@illa-design/radio"
import { FC } from "react"
import LabelWrapper from "../LabelWrapper"
import { WrappedRadioGroupProps } from "./interface"
import { withParser } from "../parserHOC"

const WrappedRadioGroup: FC<WrappedRadioGroupProps<any>> = (props) => {
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
    options = ["A", "B", "C"],
    direction,
    checkedBackgroundColor,
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
      <RadioGroup
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        options={options}
        direction={direction}
        colorScheme={checkedBackgroundColor}
      />
    </LabelWrapper>
  )
}

export const RadioGroupWidget = withParser(WrappedRadioGroup)
