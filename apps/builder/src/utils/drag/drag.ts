import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export function startDrag(dragNode: ComponentNode, isAdd: boolean = false) {
  store.dispatch(configActions.updateShowDot(true))
  if (!isAdd) {
    store.dispatch(
      componentsActions.updateComponentsShape({
        isMove: false,
        components: [
          {
            ...dragNode,
            isDragging: true,
          },
        ],
      }),
    )
  }
}

export function endDrag(dragNode: ComponentNode, isDropOnCanvas: boolean) {
  store.dispatch(configActions.updateShowDot(false))
  if (isDropOnCanvas) {
    store.dispatch(
      configActions.updateSelectedComponent([dragNode.displayName]),
    )
  } else {
    DisplayNameGenerator.removeDisplayName(dragNode.displayName)
  }
}
