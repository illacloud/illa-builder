import { FC, HTMLAttributes } from "react"
import { CanvasContainerCss } from "./style"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> { }

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props

  return (
    <div className={className} css={CanvasContainerCss}>
      CanvasContainer
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
