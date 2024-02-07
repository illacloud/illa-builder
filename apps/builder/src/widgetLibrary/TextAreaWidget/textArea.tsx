import { debounce } from "lodash-es"
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import useMeasure from "react-use-measure"
import { TextArea } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import {
  LABEL_TOP_UNIT_HEIGHT,
  VALIDATE_MESSAGE_HEIGHT,
} from "@/page/App/components/ScaleSquare/constant/widget"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
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
  textAreaStyle,
} from "@/widgetLibrary/TextAreaWidget/style"
import { getValidateMessageFunc } from "./utils"

export const WrappedTextarea = forwardRef<
  HTMLTextAreaElement,
  WrappedTextareaProps
>((props, ref) => {
  const {
    value,
    placeholder,
    disabled,
    readOnly,
    showCharacterCount,
    colorScheme,
    handleOnChange,
    handleOnFocus,
    handleOnBlur,
    allowClear,
    maxLength,
    dynamicHeight,
    dynamicMinHeight = 0,
    dynamicMaxHeight = Infinity,
    labelPosition,
    showValidationMessage,
  } = props

  const limitedStyle = useMemo(() => {
    const limitLinePosition =
      labelPosition === "top" ? LABEL_TOP_UNIT_HEIGHT : UNIT_HEIGHT
    const minH = `${
      showValidationMessage
        ? dynamicMinHeight - limitLinePosition - VALIDATE_MESSAGE_HEIGHT
        : dynamicMinHeight - limitLinePosition
    }px`
    const maxH = `${
      showValidationMessage
        ? dynamicMaxHeight - limitLinePosition - VALIDATE_MESSAGE_HEIGHT
        : dynamicMaxHeight - limitLinePosition
    }px`
    if (dynamicHeight === "limited") {
      return {
        minH,
        maxH,
        h: "auto",
      }
    }
    if (dynamicHeight === "fixed") {
      return {
        maxH: showValidationMessage
          ? `calc(100% - ${limitLinePosition + VALIDATE_MESSAGE_HEIGHT})px`
          : `calc(100% - ${limitLinePosition})px`,
        h: "auto",
      }
    }
    return {
      minH: showValidationMessage
        ? `calc(100% - ${VALIDATE_MESSAGE_HEIGHT})px`
        : "100%",
      maxH: showValidationMessage
        ? `calc(100% - ${VALIDATE_MESSAGE_HEIGHT})px`
        : "100%",
      h: "auto",
    }
  }, [
    dynamicHeight,
    dynamicMaxHeight,
    dynamicMinHeight,
    labelPosition,
    showValidationMessage,
  ])

  return (
    <TextArea
      css={textAreaStyle}
      {...limitedStyle}
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
      onChange={handleOnChange}
      onClear={() => {
        handleOnChange("")
      }}
      autoSize
    />
  )
})

WrappedTextarea.displayName = "WrappedTextarea"

export const TextareaWidget: FC<TextareaWidgetProps> = (props) => {
  const {
    value,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
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
    dynamicHeight = "fixed",
    dynamicMinHeight,
    dynamicMaxHeight,
    defaultValue,
    handleUpdateMultiExecutionResult,
    displayName,
  } = props

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const textareaWrapperRef = useRef<HTMLDivElement>(null)
  const [messageWrapperRef, bounds] = useMeasure()
  const [textAreaValue, setTextAreaValue] = useState(defaultValue)

  useEffect(() => {
    setTextAreaValue(defaultValue)
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: defaultValue || "",
        },
      },
    ])
  }, [defaultValue, displayName, handleUpdateMultiExecutionResult])

  useEffect(() => {
    if (textareaWrapperRef.current) {
      updateComponentHeight?.(textareaWrapperRef.current?.clientHeight)
    }
  }, [validateMessage, labelPosition, updateComponentHeight])

  const handleValidate = useCallback(
    (value?: string) => {
      const message = getValidateMessageFunc(value, {
        hideValidationMessage: hideValidationMessage,
        pattern: pattern,
        regex: regex,
        minLength: minLength,
        maxLength: maxLength,
        required: required,
        customRule: customRule,
      })
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [
      hideValidationMessage,
      pattern,
      regex,
      minLength,
      maxLength,
      required,
      customRule,
      handleUpdateDsl,
    ],
  )

  const debounceOnChange = useRef(
    debounce(
      (
        value: string,
        triggerEventHandler: TextareaWidgetProps["triggerEventHandler"],
        options?: {
          hideValidationMessage?: TextareaWidgetProps["hideValidationMessage"]
          pattern?: TextareaWidgetProps["pattern"]
          regex?: TextareaWidgetProps["regex"]
          minLength?: TextareaWidgetProps["minLength"]
          maxLength?: TextareaWidgetProps["maxLength"]
          required?: TextareaWidgetProps["required"]
          customRule?: TextareaWidgetProps["customRule"]
        },
      ) => {
        new Promise((resolve) => {
          const message = getValidateMessageFunc(value, options)
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
          triggerEventHandler("change")
        })
      },
      180,
    ),
  )

  const handleOnChange = useCallback(
    (value: string) => {
      setTextAreaValue(value)
      debounceOnChange.current(value, triggerEventHandler, {
        hideValidationMessage: hideValidationMessage,
        pattern: pattern,
        regex: regex,
        minLength: minLength,
        maxLength: maxLength,
        required: required,
        customRule: customRule,
      })
    },
    [
      customRule,
      hideValidationMessage,
      maxLength,
      minLength,
      pattern,
      regex,
      required,
      triggerEventHandler,
    ],
  )

  useEffect(() => {
    updateComponentRuntimeProps({
      focus: () => {
        textareaRef.current?.focus()
      },
      setValue: (value: boolean | string | number | void) => {
        if (typeof value === "string") {
          handleOnChange(value)
        } else {
          handleOnChange("")
        }
      },
      clearValue: () => {
        handleOnChange("")
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
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    handleOnChange,
    handleUpdateDsl,
    handleValidate,
    updateComponentRuntimeProps,
    value,
  ])

  const handleOnFocus = useCallback(() => {
    triggerEventHandler("focus")
  }, [triggerEventHandler])

  const handleOnBlur = useCallback(() => {
    triggerEventHandler("blur")
  }, [triggerEventHandler])

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return true
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight])

  const minMaxValueRef = useRef<{ min?: number; max?: number }>({})
  const showValidationMessage = useMemo(() => {
    return Boolean(!hideValidationMessage && validateMessage)
  }, [hideValidationMessage, validateMessage])

  const getMinMaxHeight = (
    width: number,
    height: number,
    minMaxHeight?: number,
  ) => {
    if (minMaxHeight === undefined) {
      return minMaxHeight
    }
    return minMaxHeight - (width + height)
  }

  const minValue =
    labelPosition === "top" && label
      ? getMinMaxHeight(30, bounds.height, dynamicMinHeight)
      : getMinMaxHeight(6, bounds.height, dynamicMinHeight)

  const maxValue =
    labelPosition === "top" && label
      ? getMinMaxHeight(30, bounds.height, dynamicMaxHeight)
      : getMinMaxHeight(6, bounds.height, dynamicMaxHeight)

  if (minValue !== minMaxValueRef.current.min) {
    minMaxValueRef.current.min = minValue
  }
  if (maxValue !== minMaxValueRef.current.max) {
    minMaxValueRef.current.max = maxValue
  }

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <AutoHeightContainer
        updateComponentHeight={updateComponentHeight}
        enable={enableAutoHeight}
      >
        <div
          css={[
            applyLabelAndComponentWrapperStyle(labelPosition),
            getTextareaContentContainerStyle(
              labelPosition,
              showValidationMessage,
            ),
          ]}
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
          <WrappedTextarea
            {...props}
            value={textAreaValue}
            ref={textareaRef}
            handleOnChange={handleOnChange}
            handleOnFocus={handleOnFocus}
            handleOnBlur={handleOnBlur}
            showValidationMessage={showValidationMessage}
          />
        </div>
        {!hideValidationMessage && (
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
        )}
      </AutoHeightContainer>
    </TooltipWrapper>
  )
}

WrappedTextarea.displayName = "WrappedTextarea"
export default TextareaWidget
