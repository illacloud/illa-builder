import { FC } from "react"
import { createPortal } from "react-dom"
import { Rnd } from "react-rnd"
import { useWindowSize } from "react-use"
import { ModalBody } from "@/components/MovableModal/Body"
import { ModalFooter } from "@/components/MovableModal/Footer"
import { ModalHeader } from "@/components/MovableModal/Header"
import { MovableModalProps } from "@/components/MovableModal/interface"
import { movableModalWrapperStyle } from "@/components/MovableModal/style"

export const MovableModal: FC<MovableModalProps> = (props) => {
  const { bodyContent, title, footerContent, onClose } = props
  const { width, height } = useWindowSize()

  const hasFooterChildren =
    (Array.isArray(footerContent) && footerContent.length > 0) ||
    footerContent != null
  return createPortal(
    <Rnd
      default={{
        x: width / 2 - 200,
        y: height - 300 - 263,
        width: 400,
        height: 263,
      }}
      style={{
        zIndex: 10,
      }}
      minWidth={400}
      minHeight={263}
      bounds="window"
    >
      <div css={movableModalWrapperStyle}>
        <ModalHeader title={title} onClose={onClose} />
        <ModalBody hasFooterChildren={hasFooterChildren}>
          {bodyContent}
        </ModalBody>
        <ModalFooter hasFooterChildren={hasFooterChildren}>
          {footerContent}
        </ModalFooter>
      </div>
    </Rnd>,
    document.querySelector("#root")!,
  )
}
