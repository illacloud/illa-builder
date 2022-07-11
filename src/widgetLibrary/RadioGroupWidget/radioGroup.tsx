import { forwardRef, useEffect, useMemo } from "react"
import { RadioGroup } from "@illa-design/radio"
import { WrappedRadioGroupProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"

export const WrappedRadioGroup = forwardRef<any, WrappedRadioGroupProps>(
  (props, ref) => {
    const {
      value,
      disabled,
      options,
      direction,
      colorScheme,
      optionConfigureMode,
      manualOptions,
      mappedOption,
      displayName,
      handleUpdateGlobalData,
      handleUpdateDsl,
    } = props

    const finalOptions = useMemo(() => {
      return formatSelectOptions(
        optionConfigureMode,
        manualOptions,
        mappedOption,
      )
    }, [optionConfigureMode, manualOptions, mappedOption])
    useEffect(() => {
      if (!displayName) return
      handleUpdateGlobalData?.(displayName, {
        ...props,
        options: finalOptions,
      })
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
  },
)

WrappedRadioGroup.displayName = "RadioGroupWidget"

export const RadioGroupWidget = WrappedRadioGroup
