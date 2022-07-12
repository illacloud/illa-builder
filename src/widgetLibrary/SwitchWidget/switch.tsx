import { FC, useEffect } from "react"
import { Switch } from "@illa-design/switch"
import { SwitchWidgetProps, WrappedSwitchProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedSwitch: FC<WrappedSwitchProps> = (props) => {
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
}

WrappedSwitch.displayName = "SwitchWidget"

export const SwitchWidget: FC<SwitchWidgetProps> = (props) => {
  const {
    value,
    disabled,
    colorScheme,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
  } = props

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      disabled,
      colorScheme,
      setValue: (value: boolean) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: false })
      },
      toggle: () => {
        handleUpdateDsl({ value: !value })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, value, disabled, colorScheme])
  return <WrappedSwitch {...props} />
}
