import { FC } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { containerWrapperStyle } from "../style"
import { RenderSectionProps } from "./interface"
import { bodySectionWrapperStyle } from "./style"

export const RenderBodySection: FC<RenderSectionProps> = (props) => {
  const { sectionNode, columnNumber } = props
  const executionResult = useSelector(getExecutionResult)
  const isProductionMode = useSelector(getIsILLAProductMode)
  const sectionNodeProps = executionResult[sectionNode.displayName] || {}

  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
  } = sectionNodeProps
  let { viewPath } = useParams()
  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    viewPath,
    currentViewIndex,
  )

  if (!sectionNodeProps) return null

  const componentNode = sectionNode.childrenNode?.find(
    (node) => node.displayName === currentViewDisplayName,
  )
  return (
    <div css={bodySectionWrapperStyle}>
      <div css={containerWrapperStyle}>
        {componentNode ? (
          <RenderComponentCanvasContainer
            displayName={componentNode.displayName}
            containerPadding={BASIC_CANVAS_PADDING}
            columnNumber={columnNumber}
            isRootCanvas
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

RenderBodySection.displayName = "RenderBodySection"
