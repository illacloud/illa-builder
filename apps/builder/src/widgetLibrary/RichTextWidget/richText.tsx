import { FC, forwardRef, useCallback, useEffect, useMemo, useRef } from "react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  BaseRichTextProps,
  ICustomRef,
  RichTextWidgetProps,
} from "@/widgetLibrary/RichTextWidget/interface"
import {
  containerStyle,
  editorStyle,
} from "@/widgetLibrary/RichTextWidget/style"
import { useInitConfig } from "@/widgetLibrary/RichTextWidget/useInitConfig"

const WrappedRichText = forwardRef<ICustomRef, BaseRichTextProps>(
  (props, ref) => {
    const { defaultText, handleOnChange } = props
    useInitConfig(defaultText ?? "", handleOnChange, ref)
    return (
      <div css={containerStyle}>
        <div
          id="editor-container"
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
    dynamicHeight,
    dynamicMinHeight,
    dynamicMaxHeight,
    h,
    updateComponentHeight,
    deleteComponentRuntimeProps,
    updateComponentRuntimeProps,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
  } = props

  const editorRef = useRef<ICustomRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const dynamicOptions = {
    dynamicMinHeight,
    dynamicMaxHeight,
  }

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return h * UNIT_HEIGHT >= (dynamicMinHeight ?? h * UNIT_HEIGHT)
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight, dynamicMinHeight, h])

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: unknown) => {
        if (typeof value !== "string") {
          return
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: value,
            },
          },
        ])
      },
      focus: () => {
        editorRef.current?.focus()
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
      if (typeof value !== "string") return
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value,
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

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={enableAutoHeight}
      dynamicOptions={dynamicOptions}
    >
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
          <WrappedRichText
            {...props}
            ref={editorRef}
            handleOnChange={handleOnChange}
          />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

RichTextWidget.displayName = "RichTextWidget"
export default RichTextWidget
