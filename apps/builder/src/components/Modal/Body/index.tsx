import { FC } from "react"
import { ModalBodyProps } from "@/components/Modal/Body/interface"
import { applyModalBodyWrapperStyle } from "@/components/Modal/Body/style"
import { stopDragAndDrop } from "@/components/Modal/utils/stopDragAndDrop"

export const ModalBody: FC<ModalBodyProps> = (props) => {
  const { children, footerHeight } = props
  return (
    <div
      css={applyModalBodyWrapperStyle(footerHeight)}
      onMouseDown={stopDragAndDrop}
    >
      {children}
    </div>
  )
}
