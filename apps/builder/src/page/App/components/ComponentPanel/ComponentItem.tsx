import { FC, memo } from "react"
import { useDrag } from "react-dnd"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ComponentItemProps } from "@/page/App/components/ComponentPanel/interface"
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { getAllComponentsWithRealShapeSelector } from "@/redux/currentApp/executionTree/executionSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import store from "@/store"
import { endDragMultiNodes, startDragMultiNodes } from "@/utils/drag/drag"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import { illaSnapshot } from "../DotPanel/constant/snapshot"
import { sendShadowMessageHandler } from "../DotPanel/utils/sendBinaryMessage"
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
    const isGuideOpen = useSelector(getGuideStatus)
    const params = useParams()
    const userInfo = useSelector(getCurrentUser)

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
          const { draggedSelectedComponents } = draggedItem
          sendShadowMessageHandler(-1, "", [], 0, 0, 0, 0)
          endDragMultiNodes(
            draggedSelectedComponents,
            dropResultInfo?.isDropOnCanvas ?? false,
            true,
          )
        },
        item: () => {
          const item = generateComponentNode({
            widgetName,
            type,
            ...partialDragInfo,
          })
          const rootState = store.getState()
          let childrenNodes = getAllComponentsWithRealShapeSelector(rootState)
          illaSnapshot.setSnapshot(childrenNodes)
          startDragMultiNodes([item], true)
          return {
            item,
            draggedSelectedComponents: [item],
            currentColumnNumber: 64,
          }
        },
      }),
      [isEditMode],
    )

    return (
      <div
        css={itemContainerStyle}
        ref={dragRef}
        {...(isGuideOpen ? { "data-onboarding-element": type } : {})}
      >
        <div css={dragPreviewStyle} ref={dragPreviewRef} />
        <span
          css={iconStyle}
          {...(isGuideOpen ? { "data-onboarding-icon": type } : {})}
        >
          {icon}
        </span>
        <span css={nameStyle}>{widgetName}</span>
      </div>
    )
  },
)

ComponentItem.displayName = "ComponentItem"
