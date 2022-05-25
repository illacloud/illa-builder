import { FC } from "react"
import { useDrag } from "react-dnd"
import { ComponentModel } from "@/wrappedComponents/interface"
import { iconCss, itemContainerCss, nameCss } from "./style"
import { useDragWidget } from "@/page/Editor/hooks/useDragWidget"

export const ComponentItem: FC<ComponentModel> = (props) => {
  const { widgetName, icon, type = "", defaults, ...rest } = props
  const { setDraggingNewWidget } = useDragWidget()
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
    <div
      css={itemContainerCss}
      ref={dragRef}
      onDragStart={() => {
        setDraggingNewWidget?.(true, {
          ...rest,
          type,
          props: defaults,
        })
      }}
    >
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{widgetName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
