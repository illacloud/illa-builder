import { FC, useMemo } from "react"
import {
  dragPreviewStyle,
  iconStyle,
  itemContainerStyle,
  nameStyle,
} from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import {
  DragCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { widgetName, icon, id, ...partialDragInfo } = props

  const [, dragRef, dragPreviewRef] = useDrag<
    ComponentNode,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      item: () => {
        return generateComponentNode({
          widgetName,
          ...partialDragInfo,
        })
      },
    }),
    [],
  )

  return (
    <div css={itemContainerStyle} ref={dragRef}>
      <div css={dragPreviewStyle} ref={dragPreviewRef} />
      <span css={iconStyle}>{icon}</span>
      <span css={nameStyle}>{widgetName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
