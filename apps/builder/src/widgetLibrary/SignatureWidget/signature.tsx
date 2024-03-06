import { FC, useCallback, useEffect, useRef } from "react"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { ICustomRef, SignatureWidgetProps } from "./interface"
import SignatureCanvas from "./signatureCanvas"
import {
  containerStyle,
  labelWrapperStyle,
  validateMessageStyle,
} from "./style"

export const SignatureWidget: FC<SignatureWidgetProps> = (props) => {
  const {
    value,
    tooltipText,
    labelWidth = 33,
    labelAlign,
    validateMessage,
    labelHidden,
    labelPosition,
    label,
    hideValidationMessage,
    labelCaption,
    required,
    labelFull,
    labelWidthUnit,
    displayName,
    customRule,
    padding,
    backgroundColor,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const customRef = useRef<ICustomRef>(null)

  const getValidateMessage = useCallback(
    (value: unknown) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [customRule, hideValidationMessage, required],
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

  const handleUpdateSignature = (value?: string, dataURI?: string) => {
    new Promise((resolve) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            value,
            dataURI,
          },
        },
      ])
      resolve(true)
    }).then(() => {
      triggerEventHandler("change")
    })
  }

  useEffect(() => {
    updateComponentRuntimeProps({
      clearValue: () => {
        customRef.current?.clear()
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: undefined,
              dataURI: undefined,
            },
          },
        ])
      },
      validate: () => {
        return handleValidate(value)
      },
      clearValidation: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              validateMessage: undefined,
            },
          },
        ])
      },
      setDisabled: (disabled?: boolean) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              disabled: disabled,
            },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateMultiExecutionResult,
    handleValidate,
    updateComponentRuntimeProps,
    value,
  ])

  return (
    <div css={containerStyle(padding?.size, backgroundColor)}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={labelWrapperStyle(labelPosition)}>
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
          <SignatureCanvas
            {...props}
            ref={customRef}
            handleUpdateSignature={handleUpdateSignature}
          />
          {!hideValidationMessage && (
            <div
              css={validateMessageStyle(
                labelWidth,
                labelPosition,
                labelHidden || !label,
              )}
            >
              <InvalidMessage validateMessage={validateMessage} />
            </div>
          )}
        </div>
      </TooltipWrapper>
    </div>
  )
}

SignatureWidget.displayName = "SignatureWidget"
export default SignatureWidget
