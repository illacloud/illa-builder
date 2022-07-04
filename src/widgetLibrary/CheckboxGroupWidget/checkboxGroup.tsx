import { forwardRef } from "react"
import { CheckboxGroup } from "@illa-design/checkbox"
import { WrappedCheckboxGroupProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedCheckbox = forwardRef<any, WrappedCheckboxGroupProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      disabled,
      options,
      direction,
      colorScheme,
      handleUpdateDsl,
    } = props

    return (
      <div css={containerStyle}>
        <CheckboxGroup
          value={value}
          defaultValue={defaultValue}
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

WrappedCheckbox.displayName = "RadioGroupWidget"

export const CheckboxWidget = WrappedCheckbox
