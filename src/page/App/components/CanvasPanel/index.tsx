import { FC, ReactNode } from "react"
import { containerStyle } from "./style"
import { CanvasPanelProps } from "./interface"
import { DotPanel } from "@/page/App/components/DotPanel"
import { useSelector } from "react-redux"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"

export const CanvasPanel: FC<CanvasPanelProps> = (props) => {
  const { ...otherProps } = props

  const canvasTree = useSelector(getCanvas)

  return (
    <div {...otherProps} css={containerStyle}>
      {applyCanvasTree(canvasTree)}
    </div>
  )
}

function applyCanvasTree(
  componentNode: ComponentNode | null,
): ReactNode | null {
  if (componentNode == null) {
    return null
  }
  switch (componentNode.containerType) {
    case "EDITOR_DOT_PANEL":
      return <DotPanel componentNode={componentNode} />
    case "EDITOR_SCALE_SQUARE":
      return <ScaleSquare componentNode={componentNode} />
    default:
      return null
  }
}

CanvasPanel.displayName = "CanvasPanel"
