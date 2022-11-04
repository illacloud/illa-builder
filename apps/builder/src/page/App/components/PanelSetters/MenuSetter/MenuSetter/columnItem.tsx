import { FC, useRef } from "react"
import { ColumnItemProps } from "./interface"
import { optionListItemStyle } from "./style"
import { DragIconAndLabel } from "./dragIconAndLabel"

export const ColumnItem: FC<ColumnItemProps> = (props) => {
  const { accessorKey, header, value, visible, custom, index } = props
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
