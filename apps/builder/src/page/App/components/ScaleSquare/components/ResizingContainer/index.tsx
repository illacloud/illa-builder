import { get } from "lodash"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { AutoHeightWithLimitedContainer } from "@/page/App/components/ScaleSquare/components/AutoHeightWithLimitedContainer"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import {
  getIsILLAEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import { getFirstDragShadowInfo } from "@/redux/currentApp/dragShadow/dragShadowSelector"
import {
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
  getIsDragging,
} from "@/redux/currentApp/executionTree/executionSelector"
import InnerResizingContainer from "../InnerResizingContainer"
import { PositionContainer } from "../PositionContainer"
import { ResizingContainerProps } from "./interface"

export const ResizingContainer: FC<ResizingContainerProps> = (props) => {
  const {
    unitW,
    displayName,
    children,
    widgetHeight,
    widgetTop,
    widgetLeft,
    widgetWidth,
  } = props

  const firstDragShadow = useSelector(getFirstDragShadowInfo)

  const isResizingWithOthers = firstDragShadow.some((dragShadow) => {
    return dragShadow?.displayNames?.includes(displayName)
  })

  const isEditMode = useSelector(getIsILLAEditMode)
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const executionResult = useSelector(getExecutionResult)
  const layoutInfoResult = useSelector(getExecutionWidgetLayoutInfo)
  const currentWidgetLayoutInfo = layoutInfoResult[displayName]
  const currentWidgetProps = get(executionResult, displayName, {})

  const isDraggingStateInGlobal = useSelector(getIsDragging)

  const isAutoLimitedMode =
    get(currentWidgetProps, `dynamicHeight`, "fixed") === "limited"

  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  return !isResizingWithOthers ? (
    <>
      <PositionContainer x={widgetLeft} y={widgetTop} displayName={displayName}>
        <InnerResizingContainer
          width={widgetWidth}
          height={widgetHeight}
          minWidth={DEFAULT_MIN_COLUMN * unitW}
          minHeight={
            (currentWidgetLayoutInfo?.layoutInfo.minH ?? 3) * UNIT_HEIGHT
          }
          displayName={displayName}
        >
          <>
            {children}
            {isEditMode &&
              isSelected &&
              !isDraggingStateInGlobal &&
              isAutoLimitedMode && (
                <AutoHeightWithLimitedContainer
                  containerHeight={widgetHeight}
                  displayName={displayName}
                />
              )}
          </>
        </InnerResizingContainer>
      </PositionContainer>
    </>
  ) : null
}
