import { FC } from "react"
import { useSelector } from "react-redux"
import { RenderModalCanvasContainer } from "@/page/App/components/DotPanel/components/Canvas/renderModalCanvasContainer"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import {
  getCurrentPageModalSection,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RenderModalSectionProps } from "./interface"
import { modalWrapperStyle } from "./style"

export const RenderModalSection: FC<RenderModalSectionProps> = (props) => {
  const { columnNumber } = props
  const executionResult = useSelector(getExecutionResult)
  const modalSection = useSelector(getCurrentPageModalSection)

  if (
    !modalSection ||
    !Array.isArray(modalSection.$childrenNode) ||
    modalSection.$childrenNode.length === 0
  )
    return null

  const currentModalDisplayName = modalSection.$childrenNode?.find(
    (childName: string) => {
      const childNode = executionResult[childName]
      return childNode?.isVisible
    },
  )

  if (!currentModalDisplayName) return null

  return (
    <div css={modalWrapperStyle}>
      <RenderModalCanvasContainer
        displayName={modalSection.displayName}
        containerPadding={`${BASIC_CANVAS_PADDING}`}
        columnNumber={columnNumber}
      />
    </div>
  )
}

RenderModalSection.displayName = "RenderModalSection"
