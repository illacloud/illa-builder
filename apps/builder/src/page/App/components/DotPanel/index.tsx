import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getIllaMode } from "@/redux/config/configSelector"
import {
  getCanvas,
  getViewportSizeSelector,
} from "@/redux/currentApp/editor/components/componentsSelector"
import {
  PageNode,
  RootComponentNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RenderPage } from "./renderPage"
import { applyViewportContainerWrapperStyle } from "@/page/App/components/DotPanel/style"

export const DotPanel: FC = () => {
  const canvasTree = useSelector(getCanvas) as RootComponentNode
  const rootExecutionProps = useSelector(getRootNodeExecutionResult)
  const mode = useSelector(getIllaMode)
  const viewportSize = useSelector(getViewportSizeSelector)

  const { currentPageIndex, pageSortedKey, homepageDisplayName } =
    rootExecutionProps
  let { pageName } = useParams()
  const currentDisplayName = useMemo(() => {
    if (mode === "production") {
      return (
        pageName ||
        homepageDisplayName ||
        pageSortedKey[currentPageIndex] ||
        "page1"
      )
    } else {
      return pageSortedKey[currentPageIndex] || homepageDisplayName
    }
  }, [currentPageIndex, homepageDisplayName, mode, pageName, pageSortedKey])

  if (
    !canvasTree ||
    canvasTree.containerType !== "EDITOR_DOT_PANEL" ||
    canvasTree.type !== "DOT_PANEL" ||
    canvasTree.displayName !== "root" ||
    !rootExecutionProps
  )
    return null

  const currentChildrenNode = canvasTree.childrenNode.find((node) => {
    return node.displayName === currentDisplayName
  })

  if (currentChildrenNode == undefined) return null

  return (
    <div
      css={applyViewportContainerWrapperStyle(
        mode,
        viewportSize.viewportWidth,
        viewportSize.viewportHeight,
      )}
    >
      <RenderPage
        key={currentDisplayName}
        pageNode={currentChildrenNode as PageNode}
        currentPageDisplayName={currentDisplayName}
      />
    </div>
  )
}

DotPanel.displayName = "DotPanel"
