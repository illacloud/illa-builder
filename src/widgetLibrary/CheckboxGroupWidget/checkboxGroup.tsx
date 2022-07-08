import { forwardRef, useEffect, useMemo } from "react"
import { CheckboxGroup } from "@illa-design/checkbox"
import { WrappedCheckboxGroupProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"

export const WrappedCheckbox = forwardRef<any, WrappedCheckboxGroupProps>(
  (props, ref) => {
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
        <CheckboxGroup
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

WrappedCheckbox.displayName = "RadioGroupWidget"

export const CheckboxWidget = WrappedCheckbox
