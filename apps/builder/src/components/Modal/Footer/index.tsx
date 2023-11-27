import { ForwardedRef, forwardRef } from "react"
import ResizeBarIcon from "@/assets/public/resize-bar-icon.svg?react"
import { ModalFooterProps } from "@/components/Modal/Footer/interface"
import {
  applyModalFooterWrapperStyle,
  resizeBarIconStyle,
} from "@/components/Modal/Footer/style"
import { stopDragAndDrop } from "@/components/Modal/utils/stopDragAndDrop"

const ModalFooter = (
  props: ModalFooterProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { children, hasFooterChildren, canMove } = props

  return (
    <div
      css={applyModalFooterWrapperStyle(hasFooterChildren)}
      onMouseDown={stopDragAndDrop}
      ref={ref}
    >
      {children}
      {canMove && <ResizeBarIcon css={resizeBarIconStyle} />}
    </div>
  )
}

export default forwardRef<HTMLDivElement, ModalFooterProps>(ModalFooter)
