import { FC } from "react"
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
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"
import { getIllaMode } from "@/redux/config/configSelector"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { widgetName, icon, id, ...partialDragInfo } = props

  const dispatch = useDispatch()

  const illaMode = useSelector(getIllaMode)

  const [, dragRef, dragPreviewRef] = useDrag<
    ComponentNode,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      canDrag: () => {
        return illaMode === "edit"
      },
      end: (draggedItem, monitor) => {
        if (
          searchDsl(
            store.getState().currentApp.editor.components.rootDsl,
            draggedItem.displayName,
          ) == null
        ) {
          dispatch(
            displayNameActions.removeDisplayNameReducer(
              draggedItem.displayName,
            ),
          )
        }
      },
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
