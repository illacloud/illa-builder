import { ReactCodeMirrorRef } from "@uiw/react-codemirror"
import { FC, useCallback, useEffect, useRef } from "react"
import { BaseJsonEditor } from "@/widgetLibrary/JsonEditorWidget/baseJsonEditor"
import { JsonEditorWidgetProps } from "@/widgetLibrary/JsonEditorWidget/interface"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const JsonEditorWidget: FC<JsonEditorWidgetProps> = (props) => {
  const {
    displayName,
    tooltipText,
    value,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cacheValue = useRef(value)

  const updateOnChange = useCallback(
    (value: unknown) => {
      if (typeof value === "string") {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: value,
            },
          },
        ])
      }
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  const handleOnFocus = useCallback(() => {
    triggerEventHandler("focus")
  }, [triggerEventHandler])

  const handleOnBlur = useCallback(() => {
    triggerEventHandler("blur")
  }, [triggerEventHandler])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

  useEffect(() => {
    if (cacheValue.current !== value) {
      handleOnChange()
      cacheValue.current = value
    }
  }, [handleOnChange, value])

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
