import { FC } from "react"
import { DragShadowSquareProps } from "@/page/App/components/DragShadowSquare/interface"
import { applyDragShadowSquareStyle } from "@/page/App/components/DragShadowSquare/style"

export const DragShadowSquare: FC<DragShadowSquareProps> = (props) => {
  const { isConflict = false, h, w, ...otherProps } = props
  return (
    <div css={applyDragShadowSquareStyle(isConflict, h, w)} {...otherProps} />
  )
}
