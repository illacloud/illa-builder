import { RootState } from "@/store"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export function searchDsl(
  rootNode: ComponentNode | null,
  displayName: string,
): ComponentNode | null {
  if (rootNode == null) {
    return null
  }
  if (rootNode.displayName == displayName) {
    return rootNode
  } else {
    if (rootNode.childrenNode != null) {
      rootNode.childrenNode.forEach((item) => {
        searchDsl(item, displayName)
      })
    }
  }
  return null
}

export const getComponentNode = (state: RootState, displayName: string) => {
  return searchDsl(state.currentApp.editor.components.rootDsl, displayName)
}

export const getCanvas = (state: RootState) => {
  return state.currentApp.editor.components.rootDsl
}
