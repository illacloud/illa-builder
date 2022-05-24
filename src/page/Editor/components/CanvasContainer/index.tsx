import { FC, HTMLAttributes, useRef } from "react"
import { useSelector } from "react-redux"
import { CanvasWidget } from "@/wrappedComponents/CanvasWidget"
import { getEditorDsl } from "@/redux/editor/dslReducer/dslSelectors"
import { CanvasStyle } from "./style"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props
  const { root } = useSelector(getEditorDsl)
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div className={className} ref={canvasRef} css={CanvasStyle}>
      <CanvasWidget {...root} />
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
