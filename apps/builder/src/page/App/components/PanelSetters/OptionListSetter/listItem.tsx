import { FC, useContext, useRef } from "react"
import { DragItem, ListItemProps } from "./interface"
import { useDrag, useDrop, XYCoord } from "react-dnd"
import { Identifier } from "dnd-core"
import { optionListItemStyle } from "./style"
import { DragIconAndLabel } from "@/page/App/components/PanelSetters/OptionListSetter/dragIconAndLabel"
import { More } from "@/page/App/components/PanelSetters/OptionListSetter/more"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"

export const ListItem: FC<ListItemProps> = props => {
  const { id, label, value, index } = props

  const { handleMoveOptionItem } = useContext(OptionListSetterContext)
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: "OPTION_ITEM",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      handleMoveOptionItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "OPTION_ITEM",
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  const opacity = isDragging ? 0 : 1

  return (
    <div ref={ref} style={{ opacity }}>
      <div css={optionListItemStyle}>
        <DragIconAndLabel index={index} />
        <More index={index} />
      </div>
    </div>
  )
}
