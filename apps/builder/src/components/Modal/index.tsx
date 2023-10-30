import { FC } from "react"
import useMeasure from "react-use-measure"
import { ModalBody } from "@/components/Modal/Body"
import ModalFooter from "@/components/Modal/Footer"
import { ModalHeader } from "@/components/Modal/Header"
import { ModalProps } from "@/components/Modal/interface"
import { applyModalWrapperStyle } from "@/components/Modal/style"

export const BuilderModal: FC<ModalProps> = (props) => {
  const { bodyContent, title, footerContent, canMove, w, h, onClose, docLink } =
    props

  const hasFooterChildren =
    (Array.isArray(footerContent) && footerContent.length > 0) ||
    footerContent != null

  const [ref, rect] = useMeasure()

  return (
    <div css={applyModalWrapperStyle(w, h)}>
      <ModalHeader
        title={title}
        onClose={onClose}
        canMove={canMove}
        docLink={docLink}
      />
      <ModalBody footerHeight={rect.height}>{bodyContent}</ModalBody>
      <ModalFooter
        hasFooterChildren={hasFooterChildren}
        canMove={canMove}
        ref={ref}
      >
        {footerContent}
      </ModalFooter>
    </div>
  )
}

BuilderModal.displayName = "Modal"
