import { configActions } from "@/redux/config/configSlice"
import {
  clearComponentAttachedUsersHandler,
  getDisattachedComponents,
  updateSelectedComponentUsersHandler,
} from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import { collaboratorsActions } from "@/redux/currentApp/collaborators/collaboratorsSlice"
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
    // store.dispatch(
    //   collaboratorsActions.updateComponentAttachedUsers([dragNode.displayName]),
    // )
    updateSelectedComponentUsersHandler([dragNode.displayName])
    const disattachedComponents = getDisattachedComponents(
      store.getState().currentApp.collaborators.components,
      [dragNode.displayName],
    )
    if (!!disattachedComponents.length) {
      // store.dispatch(
      //   collaboratorsActions.clearComponentAttachedUsers(disattachedComponents),
      // )
      clearComponentAttachedUsersHandler(disattachedComponents)
    }
  } else {
    DisplayNameGenerator.removeDisplayName(dragNode.displayName)
  }
}
