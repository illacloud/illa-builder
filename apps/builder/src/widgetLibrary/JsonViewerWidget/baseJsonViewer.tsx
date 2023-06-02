import { forwardRef, useMemo, useRef } from "react"
import ReactJson from "react-json-view"
import { BaseJsonViewerWidgetProps } from "@/widgetLibrary/JsonViewerWidget/interface"
import { jsonViewContainer } from "@/widgetLibrary/JsonViewerWidget/style"

export const JSONViewer = forwardRef<HTMLDivElement, BaseJsonViewerWidgetProps>(
  (props, ref) => {
    const { value, expandAll } = props
    const cacheValue = useRef<object>({})

    const currentValue = useMemo(() => {
      if (value) {
        try {
          const _v = JSON.parse(value)
          cacheValue.current = _v
          return JSON.parse(value)
        } catch (error) {
          return cacheValue.current
        }
      }
    }, [value])

    return (
      <div
        ref={ref}
        css={jsonViewContainer}
        onMouseDownCapture={(e) => e.stopPropagation()}
        onTouchStartCapture={(e) => e.stopPropagation()}
      >
        <ReactJson
          src={currentValue}
          name={false}
          iconStyle="triangle"
          enableClipboard={false}
          displayDataTypes={false}
          theme="summerfruit:inverted"
          collapsed={!expandAll}
        />
      </div>
    )
  },
)

JSONViewer.displayName = "JSONViewer"
