import { RootState } from "@/store"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export function searchDsl(
  children: ComponentNode[],
  displayName: string,
): ComponentNode | null {
  children.forEach((value, index, array) => {
    if (value.displayName == displayName) {
      return value
    } else {
      if (value.childrenNode != undefined) {
        return searchDsl(value.childrenNode, displayName)
      }
    }
  })
  return null
}

export const getBaseDSL = (state: RootState, displayName: string) => {
  // const map: Map<string, ComponentNode> = state.currentApp.editor.components.map
  // map.forEach((value, key) => {})
}
