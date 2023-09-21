import { FC } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { getCurrentPageBodySection } from "@/redux/currentApp/executionTree/executionSelector"
import { containerWrapperStyle } from "../style"
import { RenderSectionProps } from "./interface"
import { bodySectionWrapperStyle } from "./style"

export const RenderBodySection: FC<RenderSectionProps> = (props) => {
  const { columnNumber } = props
  let { viewPath } = useParams()
  const isProductionMode = useSelector(getIsILLAProductMode)
  const bodySection = useSelector(getCurrentPageBodySection)
  if (!bodySection) return null

  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
    style,
  } = bodySection
  const { padding, background = "white" } = style ?? {}
  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    viewPath,
    currentViewIndex,
  )

  const componentNode = bodySection.$childrenNode?.find(
    (node: string) => node === currentViewDisplayName,
  )

  return (
    <div css={bodySectionWrapperStyle(background)}>
      <div css={containerWrapperStyle}>
        {componentNode ? (
          <RenderComponentCanvasContainer
            displayName={componentNode}
            containerPadding={padding?.size ?? `${BASIC_CANVAS_PADDING}`}
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
