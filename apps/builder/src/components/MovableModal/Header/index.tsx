import { FC } from "react"
import { CloseIcon, DragPointIcon } from "@illa-design/react"
import { HeaderProps } from "@/components/MovableModal/Header/interface"
import {
  closeButtonHotSpotStyle,
  draggableAndTitleStyle,
  headerWrapperStyle,
  titleStyle,
} from "@/components/MovableModal/Header/style"

export const ModalHeader: FC<HeaderProps> = (props) => {
  const { title, onClose } = props
  return (
    <div css={headerWrapperStyle}>
      <div css={draggableAndTitleStyle}>
        <DragPointIcon />
        <span css={titleStyle}>{title}</span>
      </div>
      <div css={closeButtonHotSpotStyle} onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  )
}
