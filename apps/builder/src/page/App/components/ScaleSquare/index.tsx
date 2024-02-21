import { FC, memo, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  getIsILLAEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { AutoHeightWithLimitedContainer } from "./components/AutoHeightWithLimitedContainer"
import { ResizingAndDragContainer } from "./components/ResizingAndDragContainer"
import WrapperContainer from "./components/WrapperContainer"
import { ScaleSquareProps } from "./interface"
import { useGetRealShapeAndPosition } from "./utils/getRealShapeAndPosition"

const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const {
    unitW,
    displayName,
    parentNodeDisplayName,
    widgetType,
    columnNumber,
  } = props
  const { width, height, left, top } = useGetRealShapeAndPosition(
    displayName,
    unitW,
  )

  const canDrag = widgetType !== "MODAL_WIDGET"

  const isEditMode = useSelector(getIsILLAEditMode)
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  return (
    <ResizingAndDragContainer
      displayName={displayName}
      unitW={unitW}
      widgetHeight={height}
      widgetWidth={width}
      widgetTop={canDrag ? top : 0}
      widgetLeft={canDrag ? left : 0}
      parentNodeDisplayName={parentNodeDisplayName}
      widgetType={widgetType}
      columnNumber={columnNumber}
    >
      <WrapperContainer displayName={displayName} widgetHeight={height}>
        <TransformWidgetWrapper
          displayName={displayName}
          widgetType={widgetType}
          parentNodeDisplayName={parentNodeDisplayName}
          columnNumber={columnNumber}
        />
      </WrapperContainer>
      {isEditMode && selectedComponents?.length === 1 && isSelected && (
        <AutoHeightWithLimitedContainer
          containerHeight={width}
          displayName={displayName}
        />
      )}
    </ResizingAndDragContainer>
  )
}

export default memo(ScaleSquare)

ScaleSquare.displayName = "NewScaleSquare"
