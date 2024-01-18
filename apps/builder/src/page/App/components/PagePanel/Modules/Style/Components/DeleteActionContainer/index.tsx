import IconHotSpot from "@illa-public/icon-hot-spot"
import { FC } from "react"
import { MinusIcon } from "@illa-design/react"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { DeleteActionContainerProps } from "./interface"
import { deleteActionContainerStyle, deleteContainerStyle } from "./style"

export const DeleteActionContainer: FC<DeleteActionContainerProps> = (
  props,
) => {
  const { children, onClickDelete, labelName } = props

  return (
    <div css={deleteActionContainerStyle}>
      <PageLabel labelName={labelName} size="small" />
      <div css={deleteContainerStyle} className="deleteContainer">
        {children}
        <IconHotSpot onClick={onClickDelete}>
          <MinusIcon />
        </IconHotSpot>
      </div>
    </div>
  )
}
