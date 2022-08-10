import { FC, useEffect, useMemo } from "react"
import { Select } from "@illa-design/select"
import { SelectWidgetProps, WrappedSelectProps } from "./interface"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"
import { autoWidthContainerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedSelect: FC<WrappedSelectProps> = (props) => {
  const {
    showClear,
    value,
    options,
    placeholder,
    disabled,
    loading,
    readOnly,
    showSearch,
    inputValue,
    colorScheme,
    handleUpdateDsl,
  } = props

  return (
    <Select
      allowClear={showClear}
      options={options}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      loading={loading}
      readOnly={readOnly}
      showSearch={showSearch}
      inputValue={inputValue}
      colorScheme={colorScheme}
      onChange={(value) => {
        handleUpdateDsl({ value })
      }}
    />
  )
}

WrappedSelect.displayName = "WrappedSelect"

export const SelectWidget: FC<SelectWidgetProps> = (props) => {
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
    handleDeleteGlobalData,
  } = props

  const finalOptions = useMemo(() => {
    return formatSelectOptions(optionConfigureMode, manualOptions, mappedOption)
  }, [optionConfigureMode, manualOptions, mappedOption])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
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
    finalOptions,
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
  ])
  return (
    <div css={autoWidthContainerStyle}>
      <WrappedSelect {...props} options={finalOptions} />
    </div>
  )
}
SelectWidget.displayName = "SelectWidget"
