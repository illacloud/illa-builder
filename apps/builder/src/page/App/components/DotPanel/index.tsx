import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getIllaMode } from "@/redux/config/configSelector"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  PageNode,
  RootComponentNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { RenderPage } from "./renderPage"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { useParams } from "react-router-dom"

export const DotPanel: FC = () => {
  const canvasTree = useSelector(getCanvas) as RootComponentNode
  const rootExecutionProps = useSelector(getRootNodeExecutionResult)
  const mode = useSelector(getIllaMode)

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
    <RenderPage
      key={currentDisplayName}
      pageNode={currentChildrenNode as PageNode}
      currentPageDisplayName={currentDisplayName}
    />
  )
}

DotPanel.displayName = "DotPanel"
