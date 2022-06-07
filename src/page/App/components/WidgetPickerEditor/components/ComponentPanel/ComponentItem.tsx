import { FC } from "react"
import { dragPreviewStyle, iconCss, itemContainerCss, nameCss } from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { useDrag } from "react-dnd"
import { BaseDSL } from "@/wrappedComponents/interface"
import {
  DragCollectedInfo,
  DropPanelInfo,
} from "@/page/App/components/DotPanel/interface"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { displayName, icon, id, ...dragInfo } = props

  const [collectedInfo, dragRef, dragPreviewRef] = useDrag<
    BaseDSL,
    DropPanelInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      item: dragInfo as BaseDSL,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )

  return (
    <div css={itemContainerCss} ref={dragRef}>
      <div css={dragPreviewStyle} ref={dragPreviewRef} />
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{displayName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
