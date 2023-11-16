import { OutputData } from "@editorjs/editorjs"
import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import { v4 } from "uuid"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  BaseRichTextProps,
  ICustomRef,
  RichTextWidgetProps,
} from "@/widgetLibrary/RichTextWidget/interface"
import {
  containerStyle,
  editorContainerStyle,
  editorStyle,
} from "@/widgetLibrary/RichTextWidget/style"
import { useInitConfig } from "@/widgetLibrary/RichTextWidget/useInitConfig"

const WrappedRichText = forwardRef<ICustomRef, BaseRichTextProps>(
  (props, ref) => {
    const { defaultText, handleOnChange, handleMdValue } = props
    const uniqueId = useRef(v4())
    useInitConfig(
      defaultText ?? "",
      handleOnChange,
      handleMdValue,
      ref,
      uniqueId.current,
    )
    return (
      <div css={editorContainerStyle}>
        <div
          id={uniqueId.current}
          onMouseMoveCapture={(e) => e.stopPropagation()}
          css={editorStyle}
        />
      </div>
    )
  },
)

WrappedRichText.displayName = "WrappedRichText"

export const RichTextWidget: FC<RichTextWidgetProps> = (props) => {
  const {
    displayName,
    tooltipText,
    deleteComponentRuntimeProps,
    updateComponentRuntimeProps,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
  } = props

  const editorRef = useRef<ICustomRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateComponentRuntimeProps({
      focus: () => {
        editorRef.current?.focus()
      },
      renderEditor: (block: string) => {
        try {
          const blockValue: OutputData = JSON.parse(block || "{}")
          editorRef.current?.render(blockValue)
        } catch (e) {}
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    displayName,
  ])

  const handleOnChange = useCallback(
    (value: unknown) => {
      if (!Array.isArray(value)) return
      const [htmlValue, blockValue] = value
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: htmlValue,
              blockValue: JSON.stringify(blockValue),
            },
          },
        ])
        resolve(value)
      }).then(() => {
        triggerEventHandler("change")
      })
    },
    [displayName, handleUpdateMultiExecutionResult, triggerEventHandler],
  )

  const handleMdValue = useCallback(
    (value: unknown) => {
      if (typeof value !== "string") return
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            markdownValue: value,
          },
        },
      ])
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div ref={containerRef} css={containerStyle}>
        <WrappedRichText
          {...props}
          ref={editorRef}
          handleOnChange={handleOnChange}
          handleMdValue={handleMdValue}
        />
      </div>
    </TooltipWrapper>
  )
}

RichTextWidget.displayName = "RichTextWidget"
export default RichTextWidget
