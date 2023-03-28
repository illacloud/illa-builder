import { FC } from "react"
import { ModalBodyProps } from "@/components/Modal/Body/interface"
import { applyModalBodyWrapperStyle } from "@/components/Modal/Body/style"
import { stopDragAndDrop } from "@/components/Modal/utils/stopDragAndDrop"

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
