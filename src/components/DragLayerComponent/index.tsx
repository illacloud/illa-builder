import { HTMLAttributes } from "react"
import { applyDragLayer } from "./style"

export interface DragLayerProps extends HTMLAttributes<HTMLDivElement> {
  noPad?: boolean
}

export function DragLayerComponent(props: DragLayerProps) {
  return <div css={applyDragLayer(props)} />
}

DragLayerComponent.displayName = "DragLayerComponent"
