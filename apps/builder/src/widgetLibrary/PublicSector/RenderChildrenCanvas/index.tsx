import { FC } from "react"
import { useSelector } from "react-redux"
import { getIsILLAEditMode, isShowDot } from "@/redux/config/configSelector"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState"
import { IRenderChildrenCanvasProps } from "./interface"

export const RenderChildrenCanvas: FC<IRenderChildrenCanvasProps> = (props) => {
  const { currentComponentNode, columnNumber } = props
  const isEditMode = useSelector(getIsILLAEditMode)
  const canShowDots = useSelector(isShowDot)

  if (
    isEditMode &&
    !canShowDots &&
    Array.isArray(currentComponentNode.childrenNode) &&
    currentComponentNode.childrenNode.length === 0
  ) {
    return <ContainerEmptyState />
  }

  return (
    <BasicContainer
      displayName={currentComponentNode.displayName}
      minHeight={500}
      columnNumber={columnNumber}
    />
  )
}
