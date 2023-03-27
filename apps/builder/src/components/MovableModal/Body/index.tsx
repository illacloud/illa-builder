import { FC } from "react"
import { ModalBodyProps } from "@/components/MovableModal/Body/interface"
import { applyModalBodyWrapperStyle } from "@/components/MovableModal/Body/style"
import { stopDragAndDrop } from "@/components/MovableModal/utils/stopDragAndDrop"

export const ModalBody: FC<ModalBodyProps> = (props) => {
  const { children, hasFooterChildren } = props
  return (
    <div
      css={applyModalBodyWrapperStyle(hasFooterChildren)}
      onMouseDown={stopDragAndDrop}
    >
      {children}
    </div>
  )
}
