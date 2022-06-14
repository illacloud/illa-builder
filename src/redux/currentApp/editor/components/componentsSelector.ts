import { RootState } from "@/store"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export function searchDsl(
  rootNode: ComponentNode | null,
  findDisplayName: string,
): ComponentNode | null {
  if (rootNode == null) {
    return null
  }
  if (rootNode.displayName == findDisplayName) {
    return rootNode
  } else {
    const childrenNode = rootNode.childrenNode
    let returnNode: ComponentNode | null = null
    if (childrenNode != null) {
      Object.keys(childrenNode).forEach((key) => {
        returnNode = searchDsl(childrenNode[key], findDisplayName)
      })
      return returnNode
    } else {
      return null
    }
  }
}

export const getCanvas = (state: RootState) => {
  return state.currentApp.editor.components.rootDsl
}
