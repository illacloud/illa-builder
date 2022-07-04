import { RootState } from "@/store"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { createSelector } from "@reduxjs/toolkit"
import { getSelectedComponentsDisplayName } from "@/redux/config/configSelector"

export function searchDsl(
  rootNode: ComponentNode | null,
  findDisplayName: string | null,
): ComponentNode | null {
  if (rootNode == null || findDisplayName == null) {
    return null
  }
  const queue = [rootNode]
  while (queue.length > 0) {
    const head = queue[queue.length - 1]

    if (head.displayName == findDisplayName) {
      return head
    }
    queue.pop()
    if (head.childrenNode) {
      Object.keys(head.childrenNode).forEach((key) => {
        if (head.childrenNode && head.childrenNode[key]) {
          queue.push(head.childrenNode[key])
        }
      })
    }
  }
  return null
}

export function flattenDsl(rootNode: ComponentNode): {
  [key: string]: ComponentNode
} {
  const queue = [rootNode]
  let res = {}
  while (queue.length > 0) {
    const head = queue[queue.length - 1]

    if (head.containerType !== "EDITOR_DOT_PANEL") {
      res = { ...res, [head.displayName]: head || {} }
    }
    queue.pop()
    if (head.childrenNode) {
      Object.keys(head.childrenNode).forEach((key) => {
        if (head.childrenNode && head.childrenNode[key]) {
          queue.push(head.childrenNode[key])
        }
      })
    }
  }
  return res
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

export const getAllComponentDisplayNameMapProps = createSelector(
  [getCanvas],
  (rootDSL) => {
    if (rootDSL == null) {
      return null
    }
    const components = flattenDsl(rootDSL)
    if (!components) return
    const res: Record<string, any> = {}
    Object.keys(components).forEach((key) => {
      res[key] = {
        ...components[key].props,
        $type: "WIDGET",
        $widgetType: components[key].type,
      }
    })
    return res
  },
)
