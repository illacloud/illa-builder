import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC } from "react"
import { useDrag } from "react-dnd"
import { useSelector } from "react-redux"
import { DropResultInfo } from "@/page/App/components/DotPanel/components/Canvas/interface"
import { illaSnapshot } from "@/page/App/components/DotPanel/constant/snapshotNew"
import {
  sendMousePositionHandler,
  sendShadowMessageHandler,
} from "@/page/App/components/DotPanel/utils/sendBinaryMessage"
import {
  getIsILLAEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import { getIsResizing } from "@/redux/currentApp/executionTree/executionSelector"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"
import store from "@/store"
import { endDragMultiNodes, startDragMultiNodes } from "@/utils/drag/drag"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { DRAG_EFFECT, DragContainerProps, DragInfo } from "./interface"
import { dragContainerStyle } from "./style"

export const DragContainer: FC<DragContainerProps> = (props) => {
  const {
    children,
    displayName,
    canDrag = true,
    columnNumber,
    unitWidth,
    parentNodeDisplayName,
  } = props
  const isEditMode = useSelector(getIsILLAEditMode)
  const isResizingStateInGlobal = useSelector(getIsResizing)
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)

  const [, dragRef] = useDrag<DragInfo, DropResultInfo>(
    () => ({
      type: "components",
      canDrag: isEditMode && canDrag && !isResizingStateInGlobal,
      end: (draggedItem, monitor) => {
        const dropResult = monitor.getDropResult()
        sendShadowMessageHandler(-1, "", [], 0, 0, 0, 0, 0, 0, 0, 0)
        const { draggedComponents } = draggedItem
        const widgetTypes = draggedComponents.map((node) => node.widgetType)
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DRAG, {
          element: "component",
          parameter1: widgetTypes,
        })
        endDragMultiNodes(
          draggedComponents,
          !!dropResult?.isDropOnCanvas,
          false,
        )
      },
      item: () => {
        const rootState = store.getState()
        let allWidgetLayoutInfo = getClientWidgetLayoutInfo(rootState)
        illaSnapshot.setSnapshot(allWidgetLayoutInfo)
        let draggedSelectedComponents: WidgetLayoutInfo[] = []
        let currentSelectedComponents = selectedComponents
        if (!currentSelectedComponents.includes(displayName)) {
          currentSelectedComponents = [displayName]
        }
        draggedSelectedComponents = Object.values(allWidgetLayoutInfo).filter(
          (node) =>
            currentSelectedComponents.includes(node.displayName) ||
            node.displayName === displayName,
        )
        startDragMultiNodes(draggedSelectedComponents)
        sendMousePositionHandler(parentNodeDisplayName, 0, 0, 0, 0, true)
        return {
          draggedComponents: draggedSelectedComponents,
          dragEffect: DRAG_EFFECT.UPDATE,
          draggedDisplayName: displayName,
          columnNumberWhenDragged: columnNumber,
          unitWWhenDragged: unitWidth,
        }
      },
    }),
    [
      isEditMode,
      isResizingStateInGlobal,
      selectedComponents,
      displayName,
      unitWidth,
      columnNumber,
      canDrag,
      parentNodeDisplayName,
    ],
  )

  return (
    <div css={dragContainerStyle} ref={dragRef}>
      {children}
    </div>
  )
}
