import IconHotSpot from "@illa-public/icon-hot-spot"
import { FC } from "react"
import { Link } from "react-router-dom"
import { CloseIcon, DocsIcon } from "@illa-design/react"
import { HeaderProps } from "./interface"
import {
  closeIconStyle,
  headerStyle,
  modalHeaderText,
  titleContainerStyle,
} from "./style"

export const ModalHeader: FC<HeaderProps> = (props) => {
  const { title, handleCloseModal, docLink } = props

  return (
    <div css={headerStyle}>
      <div css={titleContainerStyle}>
        <div css={modalHeaderText}>{title}</div>
        {docLink && (
          <Link to={docLink} target="_blank">
            <IconHotSpot>
              <DocsIcon />
            </IconHotSpot>
          </Link>
        )}
      </div>
      <div css={closeIconStyle} onClick={handleCloseModal}>
        <CloseIcon />
      </div>
    </div>
  )
}
ModalHeader.displayName = "ModalHeader"
