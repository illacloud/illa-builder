import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import useMeasure from "react-use-measure"
import { TextArea } from "@illa-design/react"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import {
  TextareaWidgetProps,
  WrappedTextareaProps,
} from "@/widgetLibrary/TextAreaWidget/interface"
import {
  getTextareaContentContainerStyle,
  textareaContainerStyle,
} from "@/widgetLibrary/TextAreaWidget/style"

export const WrappedTextarea = forwardRef<
  HTMLTextAreaElement,
  WrappedTextareaProps
>((props, ref) => {
  const {
    displayName,
    value,
    placeholder,
    disabled,
    readOnly,
    showCharacterCount,
    colorScheme,
    handleUpdateDsl,
    handleOnChange,
    handleOnFocus,
    handleOnBlur,
    allowClear,
    maxLength,
    handleUpdateMultiExecutionResult,
    getValidateMessage,
  } = props

  const handleClear = () => handleUpdateDsl({ value: "" })

  const handleChange = useCallback(
    (value: string, e: any) => {
      new Promise((resolve) => {
        const message = getValidateMessage(value)
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: value || "",
              validateMessage: message,
            },
          },
        ])
        resolve(true)
      }).then(() => {
        handleOnChange?.()
      })
    },
    [
      displayName,
      getValidateMessage,
      handleOnChange,
      handleUpdateMultiExecutionResult,
    ],
  )

  return (
    <TextArea
      h="100%"
      w="100%"
      textAreaRef={ref}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={maxLength}
      showWordLimit={showCharacterCount}
      colorScheme={colorScheme}
      allowClear={allowClear}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onChange={handleChange}
      onClear={handleClear}
    />
  )
})

WrappedTextarea.displayName = "WrappedTextarea"

export const TextareaWidget: FC<TextareaWidgetProps> = (props) => {
  const {
    value,
    placeholder,
    disabled,
    readOnly,
    showCharacterCount,
    colorScheme,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    allowClear,
    minLength,
    maxLength,
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
    pattern,
    regex,
    customRule,
    hideValidationMessage,
    updateComponentHeight,
    validateMessage,
    triggerEventHandler,
  } = props

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const textareaWrapperRef = useRef<HTMLDivElement>(null)
  const [messageWrapperRef, bounds] = useMeasure()

  useEffect(() => {
    if (textareaWrapperRef.current) {
      updateComponentHeight?.(textareaWrapperRef.current?.clientHeight)
    }
  }, [validateMessage, labelPosition, updateComponentHeight])

  const getValidateMessage = useCallback(
    (value?: string) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          pattern,
          regex,
          minLength,
          maxLength,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [
      customRule,
      hideValidationMessage,
      maxLength,
      minLength,
      pattern,
      regex,
      required,
    ],
  )

  const handleValidate = useCallback(
    (value?: string) => {
      const message = getValidateMessage(value)
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [getValidateMessage, handleUpdateDsl],
  )

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      placeholder,
      disabled,
      readOnly,
      showCharacterCount,
      colorScheme,
      allowClear,
      minLength,
      maxLength,
      focus: () => {
        textareaRef.current?.focus()
      },
      setValue: (value: boolean | string | number | void) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: "" })
      },
      validate: () => {
        return handleValidate(value)
      },
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    placeholder,
    disabled,
    readOnly,
    showCharacterCount,
    colorScheme,
    displayName,
    allowClear,
    minLength,
    maxLength,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
  ])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

  const handleOnFocus = useCallback(() => {
    triggerEventHandler("focus")
  }, [triggerEventHandler])

  const handleOnBlur = useCallback(() => {
    triggerEventHandler("blur")
  }, [triggerEventHandler])

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div
          css={[
            applyLabelAndComponentWrapperStyle(labelPosition),
            getTextareaContentContainerStyle(labelPosition),
          ]}
          style={{
            height: `calc(100% - ${bounds.height}px)`,
          }}
        >
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
          <div style={{ height: "100%", width: "100%" }}>
            <WrappedTextarea
              {...props}
              ref={textareaRef}
              getValidateMessage={getValidateMessage}
              handleOnChange={handleOnChange}
              handleOnFocus={handleOnFocus}
              handleOnBlur={handleOnBlur}
            />
          </div>
        </div>
      </TooltipWrapper>
      <div
        css={applyValidateMessageWrapperStyle(
          labelWidth,
          labelPosition,
          labelHidden || !label,
        )}
        ref={messageWrapperRef}
      >
        <InvalidMessage validateMessage={validateMessage} />
      </div>
    </div>
  )
}

WrappedTextarea.displayName = "WrappedTextarea"
