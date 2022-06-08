import { FC } from "react"
import { dragPreviewStyle, iconCss, itemContainerCss, nameCss } from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { useDrag } from "react-dnd"
import { WidgetCardInfo } from "@/wrappedComponents/interface"
import {
  DragCollectedInfo,
  DropPanelInfo,
} from "@/page/App/components/DotPanel/interface"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { displayName, icon, ...partialDragInfo } = props

  const fullDragInfo = {
    displayName,
    ...partialDragInfo,
  }

  const [collectedInfo, dragRef, dragPreviewRef] = useDrag<
    Partial<WidgetCardInfo>,
    DropPanelInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      item: fullDragInfo,
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
