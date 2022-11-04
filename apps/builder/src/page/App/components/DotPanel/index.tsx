import { FC, useRef } from "react"
import { applyScaleStyle } from "@/page/App/components/DotPanel/style"
import { useSelector } from "react-redux"
import { getPreviewEdgeWidth } from "@/redux/config/configSelector"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  ComponentNode,
  PageNode,
  RootComponentNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { RenderPage } from "./renderPage"

export const DotPanel: FC = () => {
  const canvasTree = useSelector(getCanvas) as RootComponentNode
  // canvas field
  const edgeWidth = useSelector(getPreviewEdgeWidth)

  const containerRef = useRef<HTMLDivElement>(null)

  console.log("canvasTree", canvasTree)

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
    <RenderPage pageNode={currentChildrenNode as PageNode} />
    // <div
    //   css={applyScaleStyle(canvasTree.verticalResize, edgeWidth)}
    //   ref={containerRef}
    // >
    //   <div
    //     style={{ position: "absolute", top: 0, width: "100%", height: "20%" }}
    //   >
    //     <RenderComponentCanvas
    //       componentNode={canvasTree}
    //       containerRef={containerRef}
    //       containerPadding={edgeWidth}
    //       safeRowNumber={8}
    //       minHeight={200}
    //     />
    //   </div>
    //   <div
    //     style={{
    //       position: "absolute",
    //       top: "21%",
    //       left: 0,
    //       width: "10%",
    //       minWidth: "240px",
    //     }}
    //   >
    //     <RenderComponentCanvas
    //       componentNode={canvasTree}
    //       containerRef={containerRef}
    //       containerPadding={edgeWidth}
    //       safeRowNumber={8}
    //       blockColumns={16}
    //     />
    //   </div>
    //   <div
    //     style={{
    //       position: "absolute",
    //       top: "21%",
    //       right: 0,
    //       width: "10%",
    //       minWidth: "240px",
    //     }}
    //   >
    //     <RenderComponentCanvas
    //       componentNode={canvasTree}
    //       containerRef={containerRef}
    //       containerPadding={edgeWidth}
    //       safeRowNumber={8}
    //       blockColumns={16}
    //     />
    //   </div>
    //   {/* <RenderComponentCanvas
    //     componentNode={canvasTree}
    //     containerRef={containerRef}
    //     containerPadding={edgeWidth}
    //     safeRowNumber={8}
    //   />
    //   <RenderComponentCanvas
    //     componentNode={canvasTree}
    //     containerRef={containerRef}
    //     containerPadding={edgeWidth}
    //     safeRowNumber={8}
    //   />
    //   <RenderComponentCanvas
    //     componentNode={canvasTree}
    //     containerRef={containerRef}
    //     containerPadding={edgeWidth}
    //     safeRowNumber={8}
    //   />
    //   <RenderComponentCanvas
    //     componentNode={canvasTree}
    //     containerRef={containerRef}
    //     containerPadding={edgeWidth}
    //     safeRowNumber={8}
    //   />
    //   <RenderComponentCanvas
    //     componentNode={canvasTree}
    //     containerRef={containerRef}
    //     containerPadding={edgeWidth}
    //     safeRowNumber={8}
    //   /> */}
    // </div>
  )
}

DotPanel.displayName = "DotPanel"
