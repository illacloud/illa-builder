import { FC } from "react"
import { CloseIcon, DragPointIcon } from "@illa-design/react"
import { HeaderProps } from "@/components/Modal/Header/interface"
import {
  applyTitleStyle,
  closeButtonHotSpotStyle,
  dragIconStyle,
  headerWrapperStyle,
} from "@/components/Modal/Header/style"

export const ModalHeader: FC<HeaderProps> = (props) => {
  const { title, canMove, onClose } = props
  return (
    <div css={headerWrapperStyle}>
      {canMove && <DragPointIcon css={dragIconStyle} />}
      <span css={applyTitleStyle(canMove)}>{title}</span>
      <div css={closeButtonHotSpotStyle} onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  )
}
