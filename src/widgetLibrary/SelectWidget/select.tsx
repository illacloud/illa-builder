import { forwardRef, useEffect, useMemo } from "react"
import { Select } from "@illa-design/select"
import { WrappedSelectProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"

export const WrappedSelect = forwardRef<any, WrappedSelectProps>(
  (props, ref) => {
    const {
      showClear,
      value,
      placeholder,
      disabled,
      loading,
      readOnly,
      showSearch,
      inputValue,
      colorScheme,
      optionConfigureMode,
      mappedOption,
      manualOptions,
      displayName,
      handleUpdateDsl,
      handleUpdateGlobalData,
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
        <Select
          allowClear={showClear}
          options={finalOptions}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          readOnly={readOnly}
          showSearch={showSearch}
          inputValue={inputValue}
          size="small"
          colorScheme={colorScheme}
          onChange={(value) => {
            handleUpdateDsl({ value })
          }}
        />
      </div>
    )
  },
)

WrappedSelect.displayName = "SelectWidget"

export const SelectWidget = WrappedSelect
