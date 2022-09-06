import { FC, memo } from "react"
import {
  dragPreviewStyle,
  iconStyle,
  itemContainerStyle,
  nameStyle,
} from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { useDrag } from "react-dnd"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { useSelector } from "react-redux"
import { getIllaMode } from "@/redux/config/configSelector"
import { endDrag, startDrag } from "@/utils/drag/drag"
import store from "@/store"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { cloneDeep } from "lodash"

export const ComponentItem: FC<ComponentItemProps> = memo(
  (props: ComponentItemProps) => {
    const { widgetName, icon, id, ...partialDragInfo } = props

    const illaMode = useSelector(getIllaMode)

    const [, dragRef, dragPreviewRef] = useDrag<
      DragInfo,
      DropResultInfo,
      DragCollectedInfo
    >(
      () => ({
        type: "components",
        canDrag: () => {
          return illaMode === "edit"
        },
        end: (draggedItem, monitor) => {
          const dropResultInfo = monitor.getDropResult()
          endDrag(draggedItem.item, dropResultInfo?.isDropOnCanvas ?? false)
        },
        item: () => {
          const item = generateComponentNode({
            widgetName,
            ...partialDragInfo,
          })
          const rootState = store.getState()
          const rootNode = getCanvas(rootState)

          const childrenNodes = rootNode?.childrenNode
            ? cloneDeep(rootNode.childrenNode)
            : []
          startDrag(item)
          return {
            item,
            childrenNodes,
          }
        },
      }),
      [illaMode],
    )

    return (
      <div css={itemContainerStyle} ref={dragRef}>
        <div css={dragPreviewStyle} ref={dragPreviewRef} />
        <span css={iconStyle}>{icon}</span>
        <span css={nameStyle}>{widgetName}</span>
      </div>
    )
  },
)

ComponentItem.displayName = "ComponentItem"
