import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { applyMultiSelectedScaleSquareStyle } from "@/page/App/components/DotPanel/style"
import { getLargeItemShapeWithNodeScale } from "@/page/App/components/DotPanel/utils"
import { getSelectedComponents } from "@/redux/config/configSelector"
import { LayoutInfo } from "@/redux/currentApp/editor/components/componentsPayload"
import { getExecutionWidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionSelector"

interface MultiSelectedScaleSquareProps {
  unitW: number
  containerDisplayName: string
}

interface SelectedComponentWithShape extends LayoutInfo {
  parentNode: string
}

export const MultiSelectedScaleSquare: FC<MultiSelectedScaleSquareProps> = (
  props,
) => {
  const { unitW, containerDisplayName } = props
  const selectedComponents = useSelector(getSelectedComponents)
  const widgetExecutionResult = useSelector(getExecutionWidgetLayoutInfo)
  const selectedComponentsWithShape: SelectedComponentWithShape[] =
    useMemo(() => {
      let result: SelectedComponentWithShape[] = []
      selectedComponents.forEach((componentDisplayName) => {
        const currentItem = widgetExecutionResult[componentDisplayName]
        if (!currentItem) return null
        result.push({
          ...widgetExecutionResult[componentDisplayName].layoutInfo,
          parentNode: widgetExecutionResult[componentDisplayName].parentNode,
        })
      })
      return result
    }, [selectedComponents, widgetExecutionResult])

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
