import { forwardRef, useEffect, useMemo } from "react"
import { Select } from "@illa-design/select"
import { WrappedSelectProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

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
      if (optionConfigureMode === "static") {
        return manualOptions ?? []
      } else {
        const label = mappedOption?.labels ?? []
        const value = mappedOption?.values ?? []
        const disabled = mappedOption?.disables ?? []
        const maxLength = Math.max(label.length, value.length, disabled.length)
        const options: {
          label: string
          value: string | number
          disabled?: boolean
          extra?: any
        }[] = []
        for (let i = 0; i < maxLength; i++) {
          const labelItem = label[i] || value[i] || i
          const valueItem = value[i] || label[i] || i
          const disabledItem = !!disabled[i]
          options.push({
            label: labelItem,
            value: valueItem,
            disabled: disabledItem,
          })
        }
        return options
      }
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
