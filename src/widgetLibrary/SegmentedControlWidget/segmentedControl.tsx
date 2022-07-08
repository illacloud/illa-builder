import { forwardRef, useEffect, useMemo } from "react"
import { RadioGroup } from "@illa-design/radio"
import { WrappedSegmentedControlProps } from "./interface"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"

export const WrappedSegmentedControl = forwardRef<
  any,
  WrappedSegmentedControlProps
>((props, ref) => {
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
  } = props

  const finalOptions = useMemo(() => {
    return formatSelectOptions(optionConfigureMode, manualOptions, mappedOption)
  }, [optionConfigureMode, manualOptions, mappedOption])

  useEffect(() => {
    if (!displayName) return
    handleUpdateGlobalData?.(displayName, {
      ...props,
      options: finalOptions,
    })
  }, [displayName, finalOptions])

  return (
    <RadioGroup
      type="button"
      value={value}
      disabled={disabled}
      options={finalOptions}
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
