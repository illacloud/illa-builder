import { FC } from "react"
import { useDrag } from "react-dnd"
import { ComponentModel } from "@/wrappedComponents/interface"
import { iconCss, itemContainerCss, nameCss } from "./style"
import { widgetBuilder } from "../../../../../../wrappedComponents/WidgetBuilder"
import { v4 as uuidv4 } from "uuid"

export const ComponentItem: FC<ComponentModel> = (props) => {
  const { name, icon, type = "", defaults, ...rest } = props

  const [dragCollectProps, dragRef, dragPreview] = useDrag(
    () => ({
      type,
      item: {
        ...rest,
        type,
        hasDropped: false,
        props: defaults,
      },
      options: { dropEffect: "copy" },
      previewOptions: { offsetX: 0 },
      end: (draggedItem, monitor) => {
        console.log(draggedItem, monitor, "drag end")
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  )

  return (
    <div css={itemContainerCss} ref={dragRef}>
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{name}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
