import { forwardRef } from "react"
import { RadioGroup } from "@illa-design/radio"
import { WrappedRadioGroupProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedRadioGroup = forwardRef<any, WrappedRadioGroupProps>(
  (props, ref) => {
    const {
      value,
      disabled,
      options,
      direction,
      colorScheme,
      handleUpdateDsl,
    } = props
    return (
      <div css={containerStyle}>
        <RadioGroup
          value={value}
          disabled={disabled}
          options={options}
          direction={direction}
          colorScheme={colorScheme}
          onChange={(value) => {
            handleUpdateDsl({ value })
          }}
        />
      </div>
    )
  },
)

WrappedRadioGroup.displayName = "RadioGroupWidget"

export const RadioGroupWidget = WrappedRadioGroup
