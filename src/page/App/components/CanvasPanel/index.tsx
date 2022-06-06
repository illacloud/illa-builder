import { FC } from "react"
import { containerStyle } from "./style"
import { CanvasPanelProps } from "./interface"
import { DotPanel } from "@/page/App/components/DotPanel"

export const CanvasPanel: FC<CanvasPanelProps> = (props) => {
  const { ...otherProps } = props

  return (
    <div {...otherProps} css={containerStyle}>
      <DotPanel />
    </div>
  )
}

CanvasPanel.displayName = "CanvasPanel"
