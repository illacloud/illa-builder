import { FC, ReactNode } from "react"
import { applyScaleContainerStyle } from "./style"
import { CanvasPanelProps } from "./interface"
import { DotPanel } from "@/page/App/components/DotPanel"
import { useSelector } from "react-redux"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getScale } from "@/redux/currentApp/config/configSelector"

export const CanvasPanel: FC<CanvasPanelProps> = (props) => {
  const { ...otherProps } = props

  const canvasTree = useSelector(getCanvas)
  const scale = useSelector(getScale)

  return (
    <div {...otherProps} css={applyScaleContainerStyle(scale)}>
      {applyCanvasTree(canvasTree)}
    </div>
  )
}

// current root must be dot panel
function applyCanvasTree(
  componentNode: ComponentNode | null,
): ReactNode | null {
  if (componentNode == null) {
    return null
  }
  switch (componentNode.containerType) {
    case "EDITOR_DOT_PANEL":
      return (
        <DotPanel
          key={componentNode.displayName}
          componentNode={componentNode}
        />
      )
    default:
      return null
  }
}

CanvasPanel.displayName = "CanvasPanel"
