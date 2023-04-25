import { FC, useRef } from "react"
import { DragIconAndLabel } from "./dragIconAndLabel"
import { ColumnItemProps } from "./interface"
import { optionListItemStyle } from "./style"

export const ColumnItem: FC<ColumnItemProps> = (props) => {
  const { header, visible, custom, index } = props
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} css={optionListItemStyle}>
      <DragIconAndLabel
        index={index}
        label={header}
        visible={visible}
        custom={custom}
      />
    </div>
  )
}
