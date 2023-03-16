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
import {
  getIsILLAEditMode,
  getIsILLAGuideMode,
} from "@/redux/config/configSelector"
import { getFlattenArrayComponentNodes } from "@/redux/currentApp/editor/components/componentsSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"
import {
  batchMergeLayoutInfoToComponent,
  endDrag,
  startDrag,
} from "@/utils/drag/drag"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import {
  dragPreviewStyle,
  iconStyle,
  itemContainerStyle,
  nameStyle,
} from "./style"

export const ComponentItem: FC<ComponentItemProps> = memo(
  (props: ComponentItemProps) => {
    const { widgetName, icon, id, type, ...partialDragInfo } = props

    const isEditMode = useSelector(getIsILLAEditMode)
    const isGuideMode = useSelector(getIsILLAGuideMode)

    const [, dragRef, dragPreviewRef] = useDrag<
      DragInfo,
      DropResultInfo,
      DragCollectedInfo
    >(
      () => ({
        type: "components",
        canDrag: () => {
          return isEditMode
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
          const executionResult = getExecutionResult(rootState)
          let childrenNodes = allComponentNodes
            ? cloneDeep(allComponentNodes)
            : []
          if (Array.isArray(childrenNodes)) {
            const mergedChildrenNode = batchMergeLayoutInfoToComponent(
              executionResult,
              childrenNodes,
            )
            childrenNodes = cloneDeep(mergedChildrenNode)
          } else {
            childrenNodes = []
          }
          startDrag(item, true)
          return {
            item,
            childrenNodes,
            currentColumnNumber: 64,
          }
        },
      }),
      [isEditMode],
    )

    return (
      <div css={itemContainerStyle} ref={dragRef}>
        <div css={dragPreviewStyle} ref={dragPreviewRef} />
        <span
          css={iconStyle}
          {...(isGuideMode ? {} : { "data-onboarding-comp": type })}
        >
          {icon}
        </span>
        <span css={nameStyle}>{widgetName}</span>
      </div>
    )
  },
)

ComponentItem.displayName = "ComponentItem"
