import { FC } from "react"
import { PreviewPlaceholderProps } from "./interface"
import {
  applyDotLintRectangleStyle,
  applyRectangleStyle,
} from "@/page/App/components/DotPanel/style"

export const PreviewPlaceholder: FC<PreviewPlaceholderProps> = (props) => {
  const { w, h, x, y, canDrop } = props
  return (
    <div css={applyDotLintRectangleStyle(w, h, x, y, canDrop)}>
      <div css={applyRectangleStyle(canDrop)} />
    </div>
  )
}
