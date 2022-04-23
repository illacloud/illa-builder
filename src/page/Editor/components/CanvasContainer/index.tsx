import { FC, HTMLAttributes } from "react"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props

  return <div className={className}>CanvasContainer</div>
}

CanvasContainer.displayName = "CanvasContainer"
