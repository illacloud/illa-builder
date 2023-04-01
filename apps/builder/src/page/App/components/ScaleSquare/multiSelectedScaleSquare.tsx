import { FC } from "react"
import { useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { applyMultiSelectedScaleSquareStyle } from "@/page/App/components/DotPanel/style"
import { getLargeItemShapeWithNodeScale } from "@/page/App/components/DotPanel/utils"
import { getSelectedComponents } from "@/redux/config/configSelector"
import { getExecutionWidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionSelector"

interface MultiSelectedScaleSquareProps {
  unitW: number
  containerDisplayName: string
}

export const MultiSelectedScaleSquare: FC<MultiSelectedScaleSquareProps> = (
  props,
) => {
  const { unitW, containerDisplayName } = props
  const selectedComponents = useSelector(getSelectedComponents)
  const widgetExecutionResult = useSelector(getExecutionWidgetLayoutInfo)
  const selectedComponentsWithShape = selectedComponents.map(
    (componentDisplayName) => {
      return {
        ...widgetExecutionResult[componentDisplayName].layoutInfo,
        parentNode: widgetExecutionResult[componentDisplayName].parentNode,
      }
    },
  )
  const isSameParentNode = selectedComponentsWithShape.every(
    (node) => node.parentNode === containerDisplayName,
  )

  const scaleItem = getLargeItemShapeWithNodeScale(selectedComponentsWithShape)
  if (selectedComponents.length <= 1 || !isSameParentNode) return null

  return (
    <div
      css={applyMultiSelectedScaleSquareStyle(
        scaleItem.w * unitW,
        scaleItem.h * UNIT_HEIGHT,
        scaleItem.x * unitW,
        scaleItem.y * UNIT_HEIGHT,
      )}
    />
  )
}
