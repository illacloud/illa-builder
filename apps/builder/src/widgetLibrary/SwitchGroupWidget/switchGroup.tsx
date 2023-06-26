import { FC, useCallback, useEffect, useMemo } from "react"
import { Switch } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import {
  SwitchGroupWidgetProps,
  WrappedSwitchGroupProps,
} from "@/widgetLibrary/SwitchGroupWidget/interface"
import {
  applyCaptions,
  applyContainer,
  applyLabel,
  applySwitchContainer,
} from "@/widgetLibrary/SwitchGroupWidget/style"
import { formatSwitchOptions } from "@/widgetLibrary/SwitchGroupWidget/utils"

export const WrappedSwitchGroup: FC<WrappedSwitchGroupProps> = (props) => {
  const {
    options,
    layoutPosition,
    value: finalValue,
    colorScheme,
    handleOnChange,
  } = props

  return (
    <div css={applyContainer}>
      {options &&
        options.map(({ value, caption, label, disabled }, index) => (
          <label
            css={applySwitchContainer(layoutPosition)}
            key={`${index}-${value}`}
          >
            <Switch
              colorScheme={colorScheme}
              disabled={disabled}
              data-value={value}
              checked={Array.isArray(finalValue) && finalValue.includes(value)}
              onChange={(status, event) =>
                handleOnChange(
                  status,
                  (event.currentTarget as HTMLElement).dataset?.value,
                )
              }
            />
            <div>
              <span css={applyLabel}>{label}</span>
              {caption && <span css={applyCaptions}>{caption}</span>}
            </div>
          </label>
        ))}
    </div>
  )
}

WrappedSwitchGroup.displayName = "WrappedSwitchGroup"

export const SwitchGroupWidget: FC<SwitchGroupWidgetProps> = (props) => {
  const {
    value: finalValue = [],
    optionConfigureMode,
    mappedOption,
    manualOptions,
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
    customRule,
    hideValidationMessage,
    validateMessage,
    displayName,
    upToNumber,
    atLeastNumber,
    updateComponentHeight,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const finalOptions = useMemo(() => {
    return formatSwitchOptions(optionConfigureMode, manualOptions, mappedOption)
  }, [optionConfigureMode, manualOptions, mappedOption])

  const getValidateMessage = useCallback(
    (value: unknown) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          required,
          atLeastNumber,
          upToNumber,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [atLeastNumber, customRule, hideValidationMessage, required, upToNumber],
  )

  const handleValidate = useCallback(
    (value: unknown) => {
      const message = getValidateMessage(value)
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            validateMessage: message,
          },
        },
      ])
      return message
    },
    [displayName, getValidateMessage, handleUpdateMultiExecutionResult],
  )

  useEffect(() => {
    updateComponentRuntimeProps({
      setValueInArray: (value: unknown) => {
        if (!value || !Array.isArray(value)) {
          return
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value,
            },
          },
        ])
      },
      clearValue: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: [],
            },
          },
        ])
      },
      validate: () => {
        return handleValidate(finalValue)
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    deleteComponentRuntimeProps,
    handleValidate,
    finalValue,
    displayName,
  ])

  const handleOnChange = useCallback(
    (status: boolean, val: string | number | undefined) => {
      if (val === undefined) {
        return
      }
      let safeValue: (string | number)[]
      if (!Array.isArray(finalValue)) {
        safeValue = []
      } else {
        safeValue = finalValue
      }
      let handleValue: (string | number)[] | undefined
      if (!status) {
        handleValue = safeValue.filter((item) => item !== val)
      } else {
        handleValue = [...safeValue, val]
      }
      handleValidate(handleValue)
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: handleValue,
            },
          },
        ])
        resolve(true)
      }).then(() => {
        triggerEventHandler("change")
      })
    },
    [
      finalValue,
      handleValidate,
      handleUpdateMultiExecutionResult,
      displayName,
      triggerEventHandler,
    ],
  )

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={applyLabelAndComponentWrapperStyle(labelPosition)}>
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
          <WrappedSwitchGroup
            {...props}
            value={finalValue}
            options={finalOptions}
            handleOnChange={handleOnChange}
          />
        </div>
      </TooltipWrapper>
      {!hideValidationMessage && (
        <div
          css={applyValidateMessageWrapperStyle(
            labelWidth,
            labelPosition,
            labelHidden || !label,
          )}
        >
          <InvalidMessage validateMessage={validateMessage} />
        </div>
      )}
    </AutoHeightContainer>
  )
}
SwitchGroupWidget.displayName = "SwitchGroupWidget"
export default SwitchGroupWidget
