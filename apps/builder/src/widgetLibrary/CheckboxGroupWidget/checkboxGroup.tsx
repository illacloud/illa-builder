import { FC, useEffect, useMemo } from "react"
import { CheckboxGroup } from "@illa-design/checkbox"
import {
  CheckboxGroupWidgetProps,
  WrappedCheckboxGroupProps,
} from "./interface"
import { formatSelectOptions } from "@/widgetLibrary/PublicSector/utils/formatSelectOptions"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { applyCenterLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedCheckbox: FC<WrappedCheckboxGroupProps> = (props) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    options,
    handleUpdateDsl,
    handleOnChange,
  } = props

  return (
    <CheckboxGroup
      value={value}
      disabled={disabled}
      options={options}
      direction={direction}
      colorScheme={colorScheme}
      onChange={(value) => {
        handleOnChange?.({ value })
        handleUpdateDsl({ value })
      }}
    />
  )
}

WrappedCheckbox.displayName = "WrappedCheckbox"

export const CheckboxWidget: FC<CheckboxGroupWidgetProps> = (props) => {
  const {
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    labelPosition,
    labelFull,
    label,
    labelAlign,
    labelWidth = 33,
    labelCaption,
    labelWidthUnit,
    required,
    labelHidden,
    tooltipText,
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
    value,
    disabled,
    direction,
    colorScheme,
    optionConfigureMode,
    manualOptions,
    mappedOption,
    displayName,
    finalOptions,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={applyCenterLabelAndComponentWrapperStyle(labelPosition)}>
        <Label
          labelFull={labelFull}
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          labelHidden={labelHidden}
          hasTooltip={!!tooltipText}
        />
        <WrappedCheckbox {...props} options={finalOptions} />
      </div>
    </TooltipWrapper>
  )
}

CheckboxWidget.displayName = "CheckboxWidget"
