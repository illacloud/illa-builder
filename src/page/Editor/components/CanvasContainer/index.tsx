import { FC, HTMLAttributes } from "react"
import { WrappedButton } from "@/wrappedComponents/Button"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      <WrappedButton />
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
