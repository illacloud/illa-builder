import { FC } from "react"
import { ReactComponent as ResizeBarIcon } from "@/assets/public/resize-bar-icon.svg"
import { ModalFooterProps } from "@/components/Modal/Footer/interface"
import {
  applyModalFooterWrapperStyle,
  resizeBarIconStyle,
} from "@/components/Modal/Footer/style"
import { stopDragAndDrop } from "@/components/Modal/utils/stopDragAndDrop"

export const ModalFooter: FC<ModalFooterProps> = (props) => {
  const { children, hasFooterChildren, canMove, footerH } = props

  return (
    <div
      css={applyModalFooterWrapperStyle(hasFooterChildren, footerH)}
      onMouseDown={stopDragAndDrop}
    >
      {children}
      {canMove && <ResizeBarIcon css={resizeBarIconStyle} />}
    </div>
  )
}
