import { FC } from "react"
import { ModalBody } from "@/components/Modal/Body"
import { ModalFooter } from "@/components/Modal/Footer"
import { ModalHeader } from "@/components/Modal/Header"
import { ModalProps } from "@/components/Modal/interface"
import { applyModalWrapperStyle } from "@/components/Modal/style"

export const BuilderModal: FC<ModalProps> = (props) => {
  const { bodyContent, title, footerContent, canMove, w, h, footerH, onClose } =
    props

  const hasFooterChildren =
    (Array.isArray(footerContent) && footerContent.length > 0) ||
    footerContent != null

  return (
    <div css={applyModalWrapperStyle(w, h)}>
      <ModalHeader title={title} onClose={onClose} canMove={canMove} />
      <ModalBody hasFooterChildren={hasFooterChildren}>{bodyContent}</ModalBody>
      <ModalFooter
        hasFooterChildren={hasFooterChildren}
        canMove={canMove}
        footerH={footerH}
      >
        {footerContent}
      </ModalFooter>
    </div>
  )
}

BuilderModal.displayName = "Modal"
