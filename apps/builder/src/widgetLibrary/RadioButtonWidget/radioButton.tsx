import { FC, useEffect, useMemo } from "react"
import { RadioGroup } from "@illa-design/radio"
import { RadioButtonWidgetProps, WrappedRadioButtonProps } from "./interface"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"
import { autoWidthContainerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedRadioButton: FC<WrappedRadioButtonProps> = (props) => {
  const { value, options, disabled, direction, colorScheme, handleUpdateDsl } =
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
}

WrappedRadioButton.displayName = "WrappedRadioButton"

export const RadioButtonWidget: FC<RadioButtonWidgetProps> = (props) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    handleUpdateDsl,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  const finalOptions = useMemo(() => {
    return formatSelectOptions(optionConfigureMode, manualOptions, mappedOption)
  }, [optionConfigureMode, manualOptions, mappedOption])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      disabled,
      direction,
      colorScheme,
      optionConfigureMode,
      manualOptions,
      mappedOption,
      options: finalOptions,
      setValue: (value: any) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {},
      clearValidation: () => {},
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    finalOptions,
  ])
  return <WrappedRadioButton {...props} options={finalOptions} />
}
RadioButtonWidget.displayName = "RadioButtonWidget"
