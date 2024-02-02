import { FC, memo, useMemo } from "react"
import { useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { getLargeItemShapeWithNodeScale } from "@/page/App/components/DotPanel/utils"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import {
  MultiSelectedScaleSquareProps,
  SelectedComponentWithShape,
} from "./interface"
import { applyMultiSelectedScaleSquareStyle } from "./style"

const MultiSelectedScaleSquare: FC<MultiSelectedScaleSquareProps> = (props) => {
  const { unitW, containerDisplayName } = props
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const widgetExecutionResult = useSelector(getClientWidgetLayoutInfo)
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

MultiSelectedScaleSquare.displayName = "MultiSelectedScaleSquare"

export default memo(MultiSelectedScaleSquare)
