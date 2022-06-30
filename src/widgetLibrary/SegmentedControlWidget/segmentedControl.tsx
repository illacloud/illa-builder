import { forwardRef } from "react"
import { RadioGroup } from "@illa-design/radio"
import LabelWrapper from "@/widgetLibrary/PublicSector/LabelWrapper"
import { WrappedSegmentedControlProps } from "./interface"

export const WrappedSegmentedControl = forwardRef<
  any,
  WrappedSegmentedControlProps
>((props, ref) => {
  const {
    label,
    labelPosition,
    labelWidth,
    labelWidthUnit,
    labelCaption,
    labelAlign,
    tooltipText,
    value,
    disabled,
    options,
    direction,
    styles,
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
      <RadioGroup
        type="button"
        value={value}
        disabled={disabled}
        options={options}
        direction={direction}
        colorScheme={styles?.colorScheme}
        onChange={(value) => {
          handleUpdateDsl({ value })
        }}
      />
    </LabelWrapper>
  )
})

WrappedSegmentedControl.displayName = "WrappedSegmentedControl"

export const SegmentedControlWidget = WrappedSegmentedControl
