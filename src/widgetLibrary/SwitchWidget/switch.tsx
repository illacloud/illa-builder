import { forwardRef, useImperativeHandle } from "react"
import { Switch } from "@illa-design/switch"
import { WrappedSwitchProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedSwitch = forwardRef<any, WrappedSwitchProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      setValue: (value: boolean) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      toggleValue: () => {
        handleUpdateDsl({ value: !props.value })
      },
    }))

    const { value, disabled, colorScheme, handleUpdateDsl, handleOnChange } =
      props
    return (
      <div css={containerStyle}>
        <Switch
          checked={value}
          disabled={disabled}
          colorScheme={colorScheme}
          onChange={(value) => {
            handleOnChange()
            handleUpdateDsl({ value })
          }}
        />
      </div>
    )
  },
)

WrappedSwitch.displayName = "SwitchWidget"

export const SwitchWidget = WrappedSwitch
