import { ReactCodeMirrorRef } from "@uiw/react-codemirror"
import { debounce } from "lodash-es"
import { FC, useCallback, useEffect, useRef } from "react"
import { BaseJsonEditor } from "@/widgetLibrary/JsonEditorWidget/baseJsonEditor"
import { JsonEditorWidgetProps } from "@/widgetLibrary/JsonEditorWidget/interface"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const JsonEditorWidget: FC<JsonEditorWidgetProps> = (props) => {
  const {
    displayName,
    tooltipText,
    value,
    defaultValue,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cacheDefaultValue = useRef(defaultValue)
  const cacheValue = useRef(value)

  const debounceUpdateOnChange = useRef(
    debounce(
      (
        value: unknown,
        triggerEventHandler: JsonEditorWidgetProps["triggerEventHandler"],
      ) => {
        if (typeof value === "string") {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                value: value,
              },
            },
          ])
          triggerEventHandler("change")
        }
      },
      180,
    ),
  )

  const updateOnChange = useCallback(
    (value: unknown) => {
      debounceUpdateOnChange.current(value, triggerEventHandler)
    },
    [triggerEventHandler],
  )

  const handleOnFocus = useCallback(() => {
    triggerEventHandler("focus")
  }, [triggerEventHandler])

  const handleOnBlur = useCallback(() => {
    triggerEventHandler("blur")
  }, [triggerEventHandler])

  useEffect(() => {
    if (cacheDefaultValue.current !== defaultValue) {
      cacheDefaultValue.current = defaultValue
    }
  }, [defaultValue])

  useEffect(() => {
    if (
      cacheDefaultValue.current === defaultValue &&
      cacheValue.current !== cacheDefaultValue.current
    ) {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            value: defaultValue,
          },
        },
      ])
      cacheValue.current = defaultValue
    }
  }, [defaultValue, displayName, handleUpdateMultiExecutionResult])

  useEffect(() => {
    if (cacheValue.current !== value) {
      cacheValue.current = value
    }
  }, [value])

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: unknown) => {
        if (typeof value !== "string") return
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
              value: undefined,
            },
          },
        ])
      },
      focus: () => {
        editorRef.current?.view?.focus()
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    displayName,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
  ])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div ref={containerRef}>
        <BaseJsonEditor
          {...props}
          ref={editorRef}
          value={value}
          handleOnChange={updateOnChange}
          handleOnBlur={handleOnBlur}
          handleOnFocus={handleOnFocus}
        />
      </div>
    </TooltipWrapper>
  )
}

JsonEditorWidget.displayName = "JsonEditorWidget"
export default JsonEditorWidget
