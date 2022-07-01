import { forwardRef } from "react"
import { CheckboxGroup } from "@illa-design/checkbox"
import LabelWrapper from "@/widgetLibrary/PublicSector/LabelWrapper"
import { WrappedCheckboxGroupProps } from "./interface"

export const WrappedCheckbox = forwardRef<any, WrappedCheckboxGroupProps>(
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
      defaultValue,
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
        <CheckboxGroup
          value={value}
          defaultValue={defaultValue}
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

WrappedCheckbox.displayName = "RadioGroupWidget"

export const CheckboxWidget = WrappedCheckbox
