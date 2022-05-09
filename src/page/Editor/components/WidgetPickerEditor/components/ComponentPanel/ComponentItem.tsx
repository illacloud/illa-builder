import { FC } from "react"
import { useDrag } from "react-dnd"
import { ComponentModel } from "./interface"
import { iconCss, itemContainerCss, nameCss } from "./style"

export const ComponentItem: FC<ComponentModel> = (props) => {
  const { name, icon, itemType } = props

  const [dragCollectProps, dragRef, dragPreview] = useDrag(
    () => ({
      type: itemType,
      item: { type: itemType, hasDropped: false },
      options: { dropEffect: "copy" },
      previewOptions: { offsetX: 0 },
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
