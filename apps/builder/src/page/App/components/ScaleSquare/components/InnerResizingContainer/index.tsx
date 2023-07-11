import { get } from "lodash"
import { FC, memo, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  getIsLikeProductMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import ResizeHandler from "./ResizeHandler"
import { ResizingContainerProps } from "./interface"
import { resizingContainerStyle } from "./style"

const InnerResizingContainer: FC<ResizingContainerProps> = (props) => {
  const { children, minHeight, minWidth, width, height, displayName } = props
  const executionResult = useSelector(getExecutionResult)

  const currentWidgetProps = get(executionResult, displayName, {})

  const resizeDirection = useMemo(() => {
    const direction =
      currentWidgetProps.resizeDirection ??
      widgetBuilder(currentWidgetProps.$widgetType)?.config?.resizeDirection
    return direction || RESIZE_DIRECTION.ALL
  }, [currentWidgetProps.$widgetType, currentWidgetProps.resizeDirection])

  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const isLikeProductionMode = useSelector(getIsLikeProductMode)

  return (
    <div css={resizingContainerStyle(width, height, minWidth, minHeight)}>
      {children}
      {isSelected && !isLikeProductionMode && (
        <ResizeHandler
          resizeDirection={resizeDirection}
          displayName={displayName}
        />
      )}
    </div>
  )
}

InnerResizingContainer.displayName = "NewResizingContainer"

export default memo(InnerResizingContainer)
