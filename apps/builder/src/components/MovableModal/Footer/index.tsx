import { FC } from "react"
import { ReactComponent as ResizeBarIcon } from "@/assets/public/resize-bar-icon.svg"
import { ModalFooterProps } from "@/components/MovableModal/Footer/interface"
import {
  applyModalFooterWrapperStyle,
  resizeBarIconStyle,
} from "@/components/MovableModal/Footer/style"
import { stopDragAndDrop } from "@/components/MovableModal/utils/stopDragAndDrop"

export const ModalFooter: FC<ModalFooterProps> = (props) => {
  const { children, hasFooterChildren } = props

  return (
    <div
      css={applyModalFooterWrapperStyle(hasFooterChildren)}
      onMouseDown={stopDragAndDrop}
    >
      {children}
      <ResizeBarIcon css={resizeBarIconStyle} />
    </div>
  )
}
