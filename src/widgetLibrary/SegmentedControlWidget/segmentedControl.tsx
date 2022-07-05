import { forwardRef } from "react"
import { RadioGroup } from "@illa-design/radio"
import { WrappedSegmentedControlProps } from "./interface"

export const WrappedSegmentedControl = forwardRef<
  any,
  WrappedSegmentedControlProps
>((props, ref) => {
  const { value, disabled, options, direction, colorScheme, handleUpdateDsl } =
    props
  return (
    <RadioGroup
      type="button"
      value={value}
      disabled={disabled}
      options={options}
      direction={direction}
      colorScheme={colorScheme}
      onChange={(value) => {
        handleUpdateDsl({ value })
      }}
    />
  )
})

WrappedSegmentedControl.displayName = "WrappedSegmentedControl"

export const SegmentedControlWidget = WrappedSegmentedControl
