import { createSelector } from "@reduxjs/toolkit"
import { get, set } from "lodash"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import store, { RootState } from "@/store"

export function searchDSLByDisplayName(
  displayName: string,
  rootState: RootState = store.getState(),
) {
  const rootNode = getCanvas(rootState)
  return searchDsl(rootNode, displayName)
}

export function searchCurrentPageContainerNode(
  pageSortedKey?: string[],
  currentPageIndex?: number,
): ComponentNode | null {
  if (!pageSortedKey || !currentPageIndex) {
    return null
  }

  const otherPageDisplayName = pageSortedKey[currentPageIndex]

  const pageNode = searchDsl(getCanvas(store.getState()), otherPageDisplayName)

  const groupNode = pageNode?.childrenNode?.find((node) => {
    return node.showName === "bodySection"
  })

  if (groupNode) {
    const { currentViewIndex, viewSortedKey } =
      store.getState().currentApp.execution.result[groupNode.displayName]
    const parentNodeDisplayName = viewSortedKey[currentViewIndex]
    return searchDsl(groupNode, parentNodeDisplayName)
  }
  return null
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

export function flattenDslToMapExcludeContainerNode(rootNode: ComponentNode): {
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

export const getAppComponents = (state: RootState) => {
  return state.currentApp.editor.components?.childrenNode
}

export const getSelectedComponentNode = createSelector(
  [getSelectedComponentDisplayNames, getCanvas],
  (selectedComponentDisplayNames, rootCanvas) => {
    return selectedComponentDisplayNames
      .map((displayName) => {
        return searchDsl(rootCanvas, displayName)
      })
      .filter((node) => node != null) as ComponentNode[]
  },
)

export const getComponentNodeBySingleSelected = createSelector(
  [getCanvas, getSelectedComponentDisplayNames],
  (rootDsl, selectedComponentDisplayNames) => {
    if (selectedComponentDisplayNames.length === 1) {
      return searchDsl(rootDsl, selectedComponentDisplayNames[0])
    }
    return null
  },
)

export const getDisplayNameMapComponent = createSelector(
  [getCanvas],
  (rootDSL) => {
    if (rootDSL == null) {
      return {}
    }
    return flattenDslToMapExcludeContainerNode(rootDSL)
  },
)

const getAllDescendantNodeDisplayNames = (node: ComponentNode) => {
  const queue = [node]
  let res: string[] = []
  while (queue.length > 0) {
    const head = queue[queue.length - 1]
    res.push(head.displayName)
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

export const getCurrentAppPageNames = createSelector(
  [getCanvas],
  (rootNode) => {
    if (!rootNode || !rootNode.props || !rootNode.props.pageSortedKey)
      return [] as string[]
    const pageDisplayNames = rootNode.props.pageSortedKey as string[]
    const passCheckedDisplayNames: string[] = []
    pageDisplayNames.forEach((pageDisplayName) => {
      const pageNode = searchDsl(rootNode, pageDisplayName)
      if (!pageNode || !Array.isArray(pageNode.childrenNode)) return
      passCheckedDisplayNames.push(pageNode.displayName)
    })
    return passCheckedDisplayNames
  },
)

export const getPageNameMapDescendantNodeDisplayNames = createSelector(
  [getCanvas],
  (rootNode) => {
    if (!rootNode || !rootNode.props || !rootNode.props.pageSortedKey) return {}
    const pageDisplayNames = rootNode.props.pageSortedKey as string[]
    const pageNameMapHasNodeDisplayNames: Record<string, string[]> = {}
    pageDisplayNames.forEach((pageDisplayName) => {
      const pageNode = searchDsl(rootNode, pageDisplayName)
      if (!pageNode || !Array.isArray(pageNode.childrenNode)) return
      const descendantNodeDisplayNames =
        getAllDescendantNodeDisplayNames(pageNode)
      pageNameMapHasNodeDisplayNames[pageDisplayName] =
        descendantNodeDisplayNames
    })
    return pageNameMapHasNodeDisplayNames
  },
)

export const getAllComponentDisplayNameMapProps = createSelector(
  [getCanvas, getPageNameMapDescendantNodeDisplayNames],
  (rootDSL, pageNameMapDescendantNodeDisplayNames) => {
    if (rootDSL == null) {
      return null
    }
    const reversePageNameMapDescendantNodeDisplayNames: Record<string, string> =
      {}

    Object.keys(pageNameMapDescendantNodeDisplayNames).forEach((pageName) => {
      pageNameMapDescendantNodeDisplayNames[pageName].forEach((displayName) => {
        reversePageNameMapDescendantNodeDisplayNames[displayName] = pageName
      })
    })

    const components = flattenDslToMapExcludeContainerNode(rootDSL)
    if (!components) return
    const res: Record<string, any> = {}
    Object.keys(components).forEach((key) => {
      const childrenNode = Array.isArray(components[key].childrenNode)
        ? components[key].childrenNode.map((node) => node.displayName)
        : []
      res[key] = {
        ...components[key].props,
        displayName: components[key].displayName,
        $parentNode: components[key].parentNode,
        $type: "WIDGET",
        $widgetType: components[key].type,
        $childrenNode: childrenNode,
        $parentPageName: reversePageNameMapDescendantNodeDisplayNames[key],
      }
    })
    return res
  },
)

export const getAllComponentDisplayNameMapLayoutInfo = createSelector(
  [getCanvas],
  (rootDSL) => {
    if (rootDSL == null) {
      return null
    }
    const components = flattenAllComponentNodeToMap(rootDSL)
    if (!components) return
    const res: Record<string, WidgetLayoutInfo> = {}
    Object.keys(components).forEach((key) => {
      const childrenNode = Array.isArray(components[key].childrenNode)
        ? components[key].childrenNode.map((node) => node.displayName)
        : []

      const {
        displayName,
        parentNode,
        type,
        containerType,
        x,
        y,
        z,
        w,
        h,
        minH,
      } = components[key]
      res[key] = {
        displayName: displayName,
        parentNode: parentNode ?? "",
        widgetType: type,
        childrenNode: childrenNode,
        containerType: containerType,
        layoutInfo: {
          x,
          y,
          z,
          w,
          h,
          minW: DEFAULT_MIN_COLUMN,
          minH,
        },
      }
    })
    return res
  },
)

export const getAllContainerWidget = createSelector([getCanvas], (rootDSL) => {
  if (rootDSL == null) {
    return null
  }
  const components = flattenDslToMapExcludeContainerNode(rootDSL)
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

      if (containerNode) {
        displayNameMappedChildren[node.displayName].push(
          containerNode.displayName,
        )
        dfsWithListNode(
          containerNode,
          displayNameMappedChildren,
          node.displayName,
        )
      }
    })

    return displayNameMappedChildren
  })

export const getViewportSizeSelector = createSelector(
  [getCanvas],
  (rootComponentNode) => {
    if (!rootComponentNode || !rootComponentNode.props)
      return {
        viewportWidth: undefined,
        viewportHeight: undefined,
        viewportSizeType: "fluid",
      }
    const { viewportWidth, viewportHeight, viewportSizeType } =
      rootComponentNode.props
    return {
      viewportWidth: viewportWidth,
      viewportHeight: viewportHeight,
      viewportSizeType,
    }
  },
)

function getNodeDepths(tree: ComponentNode) {
  const nodeDepths: Record<string, number> = {}
  function traverse(node: ComponentNode, depth: number) {
    nodeDepths[node.displayName] = depth
    if (node.childrenNode) {
      for (let i = 0; i < node.childrenNode.length; i++) {
        traverse(node.childrenNode[i], depth + 1)
      }
    }
  }
  traverse(tree, 0)
  return nodeDepths
}

export const getComponentDisplayNameMapDepth = createSelector(
  [getCanvas],
  (rootNode) => {
    if (!rootNode) return {}
    return getNodeDepths(rootNode)
  },
)

export type RelationMap = Record<
  string,
  { parentNode: string; childrenNode: string[]; containerType: string }
>
const generateRelationMap = (rootNode: ComponentNode) => {
  const queue = [rootNode]
  let relationMap: RelationMap = {}
  while (queue.length > 0) {
    const head = queue[queue.length - 1]
    relationMap = {
      ...relationMap,
      [head.displayName]: {
        parentNode: head.parentNode || "",
        childrenNode:
          head.childrenNode?.map((child) => child.displayName) ?? [],
        containerType: head.containerType,
      },
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
  return relationMap
}

const findPrevTargetNode = (
  displayName: string,
  relationMap: RelationMap,
): string => {
  let parentNode = relationMap[displayName]

  if (parentNode.containerType === "EDITOR_SCALE_SQUARE") {
    return displayName
  } else {
    if (parentNode.parentNode === "") return displayName
    return findPrevTargetNode(parentNode.parentNode, relationMap)
  }
}

export const getShowWidgetNameParentMap = createSelector(
  [getCanvas],
  (rootNode) => {
    if (!rootNode) return {}
    const relationMap = generateRelationMap(rootNode)
    const editorScaleSquareNodeRelationMap: RelationMap = {}
    Object.keys(relationMap).forEach((key) => {
      const { containerType } = relationMap[key]
      if (containerType === "EDITOR_SCALE_SQUARE") {
        editorScaleSquareNodeRelationMap[key] = relationMap[key]
      }
    })
    Object.keys(editorScaleSquareNodeRelationMap).forEach((key) => {
      const { parentNode } = editorScaleSquareNodeRelationMap[key]
      if (parentNode) {
        editorScaleSquareNodeRelationMap[key] = {
          ...editorScaleSquareNodeRelationMap[key],
          parentNode: findPrevTargetNode(parentNode, relationMap),
          childrenNode: [],
        }
      }
    })
    Object.keys(editorScaleSquareNodeRelationMap).forEach((key) => {
      const currentNode = editorScaleSquareNodeRelationMap[key]
      if (
        currentNode.parentNode &&
        editorScaleSquareNodeRelationMap[currentNode.parentNode]
      ) {
        editorScaleSquareNodeRelationMap[
          currentNode.parentNode
        ].childrenNode.push(key)
      }
    })
    return editorScaleSquareNodeRelationMap
  },
)

export const getOriginalGlobalData = createSelector([getCanvas], (rootNode) => {
  return (rootNode?.props?.globalData ?? {}) as Record<string, string>
})

export const getPageDisplayNameMapViewDisplayName = createSelector(
  [getCanvas],
  (rootNode) => {
    if (!rootNode) return {}
    const pageDisplayNameMapViewDisplayName: Record<string, Set<string>> = {}
    const pageNodes = rootNode.childrenNode
    pageNodes.forEach((pageNode) => {
      pageDisplayNameMapViewDisplayName[pageNode.displayName] = new Set()
      const sectionNodes = pageNode.childrenNode
      sectionNodes.forEach((sectionNode) => {
        const sectionConfigs = sectionNode.props?.sectionViewConfigs ?? []
        sectionConfigs.forEach((sectionConfig: Record<string, string>) => {
          pageDisplayNameMapViewDisplayName[pageNode.displayName].add(
            sectionConfig.path,
          )
        })
      })
    })
    return pageDisplayNameMapViewDisplayName
  },
)

export const getCurrentPageSortedKeys = createSelector(
  [getCanvas],
  (rootNode) => {
    if (!rootNode) return []
    return rootNode.props?.pageSortedKey ?? []
  },
)
