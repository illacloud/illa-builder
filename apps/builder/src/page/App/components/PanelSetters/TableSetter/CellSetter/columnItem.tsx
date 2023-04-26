import { FC, useRef } from "react"
import { DragIconAndLabel } from "./dragIconAndLabel"
import { ColumnItemProps } from "./interface"
import { optionListItemStyle } from "./style"

export const ColumnItem: FC<ColumnItemProps> = (props) => {
  const { index, cellValue, label, id } = props
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} css={optionListItemStyle}>
      <DragIconAndLabel
        id={id}
        index={index}
        label={label}
        cellValue={cellValue}
      />
    </div>
  )
}
