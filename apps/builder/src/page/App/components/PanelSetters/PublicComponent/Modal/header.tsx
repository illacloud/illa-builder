import { headerStyle, closeIconStyle } from "./style"
import { CloseIcon } from "@illa-design/react"
import { HeaderProps } from "./interface"
import { FC } from "react"

export const ModalHeader: FC<HeaderProps> = (props) => {
  const { title, handleCloseModal } = props

  return (
    <div css={headerStyle}>
      <span>{title}</span>
      <div css={closeIconStyle} onClick={handleCloseModal}>
        <CloseIcon />
      </div>
    </div>
  )
}
ModalHeader.displayName = "ModalHeader"
