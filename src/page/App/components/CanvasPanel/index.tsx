import { FC, ReactNode } from "react"
import { containerStyle } from "./style"
import { CanvasPanelProps } from "./interface"
import { DotPanel } from "@/page/App/components/DotPanel"
import { useSelector } from "react-redux"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const CanvasPanel: FC<CanvasPanelProps> = (props) => {
  const { ...otherProps } = props

  const canvasTree = useSelector(getCanvas)

  return (
    <div {...otherProps} css={containerStyle}>
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
