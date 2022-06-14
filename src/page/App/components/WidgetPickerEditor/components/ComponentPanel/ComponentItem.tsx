import { FC, useMemo } from "react"
import { dragPreviewStyle, iconCss, itemContainerCss, nameCss } from "./style"
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

  const componentNode = useMemo(() => {
    const fullDragInfo = {
      widgetName,
      ...partialDragInfo,
    }
    return generateComponentNode(fullDragInfo)
  }, [widgetName, partialDragInfo])

  const [collectedInfo, dragRef, dragPreviewRef] = useDrag<
    ComponentNode,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      item: componentNode,
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
      <span css={nameCss}>{widgetName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
