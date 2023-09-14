import { FC } from "react"
import { CloseIcon } from "@illa-design/react"
import { HeaderProps } from "./interface"
import { closeIconStyle, headerStyle, modalHeaderText } from "./style"

export const ModalHeader: FC<HeaderProps> = (props) => {
  const { title, handleCloseModal } = props

  return (
    <div css={headerStyle}>
      <div css={modalHeaderText}>{title}</div>
      <div css={closeIconStyle} onClick={handleCloseModal}>
        <CloseIcon />
      </div>
    </div>
  )
}
ModalHeader.displayName = "ModalHeader"
