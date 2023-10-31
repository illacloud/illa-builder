import { FC } from "react"
import { Link } from "react-router-dom"
import { CloseIcon, DocsIcon, DragPointIcon } from "@illa-design/react"
import IconHotSpot from "@/components/IconHotSpot"
import { HeaderProps } from "@/components/Modal/Header/interface"
import {
  dragIconStyle,
  headerContainerStyle,
  headerWrapperStyle,
  titleStyle,
} from "@/components/Modal/Header/style"

export const ModalHeader: FC<HeaderProps> = (props) => {
  const { title, canMove, docLink, onClose } = props
  return (
    <div css={headerWrapperStyle}>
      <div css={headerContainerStyle}>
        {canMove && <DragPointIcon css={dragIconStyle} />}
        <span css={titleStyle}>{title}</span>
        {docLink && (
          <Link to={docLink} target="_blank">
            <IconHotSpot>
              <DocsIcon />
            </IconHotSpot>
          </Link>
        )}
      </div>
      <IconHotSpot onClick={onClose}>
        <CloseIcon />
      </IconHotSpot>
    </div>
  )
}
