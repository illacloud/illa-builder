import { forwardRef } from "react"
import { RadioGroup } from "@illa-design/radio"
import LabelWrapper from "@/widgetLibrary/PublicSector/LabelWrapper"
import { WrappedRadioGroupProps } from "./interface"

export const WrappedRadioGroup = forwardRef<any, WrappedRadioGroupProps>(
  (props, ref) => {
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
  },
)

WrappedRadioGroup.displayName = "RadioGroupWidget"

export const RadioGroupWidget = WrappedRadioGroup
