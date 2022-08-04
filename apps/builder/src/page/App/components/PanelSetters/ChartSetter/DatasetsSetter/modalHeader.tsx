import { headerStyle, closeIconStyle } from "./style"
import { CloseIcon } from "@illa-design/icon"

import { FC } from "react"
import { HeaderProps } from "@/page/App/components/PanelSetters/PublicComponent/Modal/interface"

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
