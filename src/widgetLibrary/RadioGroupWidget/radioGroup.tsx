import { FC, useEffect, useMemo } from "react"
import { RadioGroup } from "@illa-design/radio"
import { WrappedRadioGroupProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"

export const WrappedRadioGroup: FC<WrappedRadioGroupProps> = (props, ref) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
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
  }, [displayName, finalOptions])
  return (
    <div css={containerStyle}>
      <RadioGroup
        value={value}
        disabled={disabled}
        options={finalOptions}
        direction={direction}
        colorScheme={colorScheme}
        onChange={(value) => {
          handleUpdateDsl({ value })
        }}
      />
    </div>
  )
}

WrappedRadioGroup.displayName = "RadioGroupWidget"

export const RadioGroupWidget = WrappedRadioGroup
