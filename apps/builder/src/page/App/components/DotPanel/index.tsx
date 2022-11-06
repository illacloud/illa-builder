import { FC, useRef } from "react"
import { useSelector } from "react-redux"
import { getPreviewEdgeWidth } from "@/redux/config/configSelector"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  PageNode,
  RootComponentNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { RenderPage } from "./renderPage"

export const DotPanel: FC = () => {
  const canvasTree = useSelector(getCanvas) as RootComponentNode

  if (
    !canvasTree ||
    canvasTree.containerType !== "EDITOR_DOT_PANEL" ||
    canvasTree.type !== "DOT_PANEL" ||
    canvasTree.displayName !== "root"
  )
    return null

  const rootNodeProps = canvasTree.props
  const { currentPageIndex = 0, pageSortedKey = ["page1"] } = rootNodeProps
  const currentDisplayName = pageSortedKey[currentPageIndex]
  const currentChildrenNode = canvasTree.childrenNode.find((node) => {
    return node.displayName === currentDisplayName
  })
  if (currentChildrenNode == undefined) return null

  return (
    <RenderPage
      pageNode={currentChildrenNode as PageNode}
      currentPageDisplayName={currentDisplayName}
    />
  )
}

DotPanel.displayName = "DotPanel"
