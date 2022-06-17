import { RootState } from "@/store"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { createSelector } from "@reduxjs/toolkit"
import { getSelectedComponentsDisplayName } from "@/redux/currentApp/config/configSelector"
import { getInspectState } from "@/redux/currentApp/editor/inspect/inspectSelector"

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

export const getComponentNodeBySingleSelected = createSelector(
  [getCanvas, getSelectedComponentsDisplayName],
  (rootDsl, selectedComponentDisplayNames) => {
    if (selectedComponentDisplayNames.length === 1) {
      return searchDsl(rootDsl, selectedComponentDisplayNames[0])
    }
    return null
  },
)
