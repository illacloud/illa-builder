import { FC } from "react"
import { PreviewPlaceholderProps } from "./interface"
import {
  applyDotLintRectangleStyle,
  applyRectangleStyle,
} from "@/page/App/components/DotPanel/style"

export const PreviewPlaceholder: FC<PreviewPlaceholderProps> = (props) => {
  const { w, h, x, y, lunchX, lunchY, canDrop } = props
  return (
    <>
      <div css={applyDotLintRectangleStyle(w, h, lunchX, lunchY)} />
      <div css={applyRectangleStyle(w, h, x, y, canDrop)} />
    </>
  )
}
