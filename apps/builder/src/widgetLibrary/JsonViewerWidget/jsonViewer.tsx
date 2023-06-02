import { FC, forwardRef, useMemo, useRef } from "react"
import { isArray, isObject } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import {
  TreeItem,
  TreeNode,
} from "@/widgetLibrary/JsonViewerWidget/baseJsonViewer"
import {
  BaseJsonViewerWidgetProps,
  JsonViewerWidgetProps,
} from "@/widgetLibrary/JsonViewerWidget/interface"
import { jsonViewContainer } from "@/widgetLibrary/JsonViewerWidget/style"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedJsonViewer = forwardRef<
  HTMLDivElement,
  BaseJsonViewerWidgetProps
>((props, ref) => {
  const { value, expandAll } = props
  const cacheValue = useRef<object>({})

  const currentValue: Record<string, any> = useMemo(() => {
    if (value) {
      try {
        const _v = JSON.parse(value)
        cacheValue.current = _v
        return _v
      } catch (error) {
        return value
      }
    } else {
      return ""
    }
  }, [value])

  const generalTree = useMemo(() => {
    if (currentValue && (isArray(currentValue) || isObject(currentValue))) {
      return Object.keys(currentValue).map((name) => {
        if (isArray(currentValue[name]) || isObject(currentValue[name])) {
          return (
            <TreeItem
              key={name}
              title={name}
              data={currentValue[name]}
              level={0}
              expandAll={expandAll}
            />
          )
        } else {
          return (
            <TreeNode
              key={name}
              name={name}
              value={currentValue[name]}
              level={0}
            />
          )
        }
      })
    } else {
      return <TreeNode value={String(currentValue)} level={0} />
    }
  }, [currentValue, expandAll])

  return (
    <div ref={ref} css={jsonViewContainer}>
      <div
        onMouseDownCapture={(e) => e.stopPropagation()}
        onTouchStartCapture={(e) => e.stopPropagation()}
      >
        {generalTree}
      </div>
    </div>
  )
})
WrappedJsonViewer.displayName = "WrappedJsonViewer"

export const JsonViewerWidget: FC<JsonViewerWidgetProps> = (props) => {
  const {
    value,
    tooltipText,
    dynamicHeight,
    h,
    expandAll,
    dynamicMinHeight,
    dynamicMaxHeight,
    updateComponentHeight,
  } = props

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

  const dynamicOptions = {
    dynamicMinHeight,
    dynamicMaxHeight,
  }

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={enableAutoHeight}
      dynamicOptions={dynamicOptions}
    >
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <WrappedJsonViewer value={value} expandAll={expandAll} />
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

JsonViewerWidget.displayName = "JsonViewerWidget"
