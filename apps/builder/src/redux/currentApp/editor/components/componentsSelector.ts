import { createSelector } from "@reduxjs/toolkit"
import { get, set } from "lodash"
import { getSelectedComponents } from "@/redux/config/configSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store, { RootState } from "@/store"

export function searchDSLByDisplayName(
  displayName: string,
  rootState: RootState = store.getState(),
) {
  const rootNode = getCanvas(rootState)
  return searchDsl(rootNode, displayName)
}

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
      head.childrenNode.forEach((child) => {
        if (child) {
          queue.push(child)
        }
      })
    }
  }
  return null
}

export function flattenDslToMap(rootNode: ComponentNode): {
  [key: string]: ComponentNode
} {
  const queue = [rootNode]
  let res = {}
  while (queue.length > 0) {
    const head = queue[queue.length - 1]
    if (head.type !== "CONTAINER_NODE") {
      res = { ...res, [head.displayName]: head || {} }
    }
    queue.pop()
    if (head.childrenNode) {
      head.childrenNode.forEach((child) => {
        if (child) {
          queue.push(child)
        }
      })
    }
  }
  return res
}

export function flattenAllComponentNodeToMap(rootNode: ComponentNode): {
  [key: string]: ComponentNode
} {
  const queue = [rootNode]
  let res = {}
  while (queue.length > 0) {
    const head = queue[queue.length - 1]
    res = { ...res, [head.displayName]: head || {} }
    queue.pop()
    if (head.childrenNode) {
      head.childrenNode.forEach((child) => {
        if (child) {
          queue.push(child)
        }
      })
    }
  }
  return res
}

export function flattenDslToArray(rootNode: ComponentNode): ComponentNode[] {
  const queue = [rootNode]
  let res: ComponentNode[] = []
  while (queue.length > 0) {
    const head = queue[queue.length - 1]

    if (head.containerType !== "EDITOR_DOT_PANEL") {
      res.push(head)
    }
    queue.pop()
    if (head.childrenNode) {
      head.childrenNode.forEach((child) => {
        if (child) {
          queue.push(child)
        }
      })
    }
  }
  return res
}

export const getCanvas = (state: RootState) => {
  return state.currentApp.editor.components
}

export const getComponentNodeBySingleSelected = createSelector(
  [getCanvas, getSelectedComponents],
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
    const components = flattenDslToMap(rootDSL)
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

export const getAllContainerWidget = createSelector([getCanvas], (rootDSL) => {
  if (rootDSL == null) {
    return null
  }
  const components = flattenDslToMap(rootDSL)
  if (!components) return
  const res: Record<string, any> = {}
  Object.keys(components).forEach((key) => {
    if (components[key].type === "CONTAINER_WIDGET") {
      res[key] = {
        ...components[key].props,
        $type: "WIDGET",
        $widgetType: components[key].type,
      }
    }
  })
  return res
})

export const getFlattenArrayComponentNodes = createSelector(
  [getCanvas],
  (rootDSL) => {
    if (rootDSL == null) {
      return null
    }
    const components = flattenDslToArray(rootDSL)
    return components || []
  },
)

export const getCurrentPageNode = createSelector([getCanvas], (rootDSL) => {
  if (rootDSL == null || !rootDSL.props) {
    return null
  }
  const { currentPageIndex, pageSortedKey } = rootDSL.props
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const currentPage = rootDSL.childrenNode.find(
    (node) => node.displayName === currentPageDisplayName,
  )
  if (!currentPage) return null
  return currentPage
})

export const getCurrentPageProps = createSelector(
  [getCurrentPageNode],
  (currentPageNode) => {
    if (currentPageNode == null || !currentPageNode.props) {
      return {}
    }
    return currentPageNode.props
  },
)

export const getCurrentPageDisplayName = createSelector(
  [getCurrentPageNode],
  (currentPageNode) => {
    if (currentPageNode == null || !currentPageNode.props) {
      return null
    }
    return currentPageNode.displayName
  },
)

export const getRootNodeProps = createSelector([getCanvas], (rootNode) => {
  if (!rootNode)
    return {
      currentPageIndex: 0,
      pageSortedKey: ["page1"],
      homepageDisplayName: "page1",
    }
  return rootNode.props
})

export const getContainerListWidget = createSelector(
  [getFlattenArrayComponentNodes],
  (componentNodes) => {
    if (!Array.isArray(componentNodes)) {
      return null
    }

    return componentNodes.filter((node) => {
      return node.type === "LIST_WIDGET"
    })
  },
)

const dfsWithListNode = (
  containerNode: ComponentNode,
  result: Record<string, string[]>,
  listDisplayName: string,
) => {
  containerNode.childrenNode?.forEach((node) => {
    if (!Array.isArray(get(result, listDisplayName))) {
      set(result, listDisplayName, [])
    }
    result[listDisplayName].push(node.displayName)
    dfsWithListNode(node, result, listDisplayName)
  })
}

export const getContainerListDisplayNameMappedChildrenNodeDisplayName =
  createSelector([getContainerListWidget], (listNodes) => {
    const displayNameMappedChildren: Record<string, string[]> = {}
    if (!listNodes) return displayNameMappedChildren
    listNodes.forEach((node) => {
      const containerNode = node.childrenNode[0]
      if (!Array.isArray(get(displayNameMappedChildren, node.displayName))) {
        set(displayNameMappedChildren, node.displayName, [])
      }
      displayNameMappedChildren[node.displayName].push(
        containerNode.displayName,
      )
      dfsWithListNode(
        containerNode,
        displayNameMappedChildren,
        node.displayName,
      )
    })

    return displayNameMappedChildren
  })
