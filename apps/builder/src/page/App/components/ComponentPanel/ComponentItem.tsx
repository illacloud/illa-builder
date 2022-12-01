import { cloneDeep } from "lodash"
import { FC, memo } from "react"
import { useDrag } from "react-dnd"
import { useSelector } from "react-redux"
import { ComponentItemProps } from "@/page/App/components/ComponentPanel/interface"
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { getIllaMode } from "@/redux/config/configSelector"
import { getFlattenArrayComponentNodes } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"
import { endDrag, startDrag } from "@/utils/drag/drag"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import {
  dragPreviewStyle,
  iconStyle,
  itemContainerStyle,
  nameStyle,
} from "./style"

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
          const allComponentNodes = getFlattenArrayComponentNodes(rootState)
          const childrenNodes = allComponentNodes
            ? cloneDeep(allComponentNodes)
            : []
          startDrag(item, true)
          return {
            item,
            childrenNodes,
            currentColumnNumber: 64,
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
