import { FC } from "react"
import { useSelector } from "react-redux"
import { RenderModalCanvasContainer } from "@/page/App/components/DotPanel/components/Canvas/renderModalCanvasContainer"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import {
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RenderModalSectionProps } from "./interface"
import { modalWrapperStyle } from "./style"

export const RenderModalSection: FC<RenderModalSectionProps> = (props) => {
  const { sectionNode, columnNumber } = props
  const layoutInfos = useSelector(getExecutionWidgetLayoutInfo)
  const executionResult = useSelector(getExecutionResult)

  if (
    !Array.isArray(sectionNode.childrenNode) ||
    sectionNode.childrenNode.length === 0
  )
    return null

  const currentLayoutInfo = layoutInfos[sectionNode.displayName]

  const currentModalDisplayName = currentLayoutInfo.childrenNode?.find(
    (childName) => {
      const childNode = executionResult[childName]
      return childNode?.isVisible
    },
  )

  if (!currentModalDisplayName) return null

  return (
    <div css={modalWrapperStyle}>
      <RenderModalCanvasContainer
        displayName={sectionNode.displayName}
        containerPadding={BASIC_CANVAS_PADDING}
        columnNumber={columnNumber}
      />
    </div>
  )
}

RenderModalSection.displayName = "RenderModalSection"
