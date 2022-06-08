import { FC } from "react"
import { dragPreviewStyle, iconCss, itemContainerCss, nameCss } from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { useDrag } from "react-dnd"
import {
  DragCollectedInfo,
  DropPanelInfo,
} from "@/page/App/components/DotPanel/interface"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { displayName, icon, ...partialDragInfo } = props

  const [collectedInfo, dragRef, dragPreviewRef] = useDrag<
    ComponentNode,
    DropPanelInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      item: {} as ComponentNode,
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
