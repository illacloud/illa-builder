import {
  ActionItem,
  ComponentMapNode,
  ComponentTreeNode,
  GlobalDataActionContent,
} from "@illa-public/public-types"
import { createSelector } from "@reduxjs/toolkit"
import { get, set } from "lodash-es"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import store, { RootState } from "@/store"
import { WidgetLayoutInfo } from "../layoutInfo/layoutInfoState"
import { ComponentsState } from "./componentsState"

export function searchDSLByDisplayName(
  displayName: string,
  rootState: RootState = store.getState(),
) {
  const components = getComponentMap(rootState)
  return components[displayName]
}

export function searchComponentFromMap(
  components: Record<string, ComponentMapNode>,
  findDisplayName: string | null,
) {
  if (components == null || findDisplayName == null) {
    return null
  }
  return components[findDisplayName]
}

export function searchDSLFromTree(
  componentTree: ComponentTreeNode,
  findDisplayName: string,
) {
  const queue = [componentTree]
  while (queue.length > 0) {
    const head = queue[0]
    if (head.displayName === findDisplayName) {
      return head
    }
    queue.shift()
    if (head.childrenNode) {
      head.childrenNode.forEach((child) => {
        queue.push(child)
      })
    }
  }
}

export function filterContainerNode(components: ComponentsState): {
  [key: string]: ComponentMapNode
} {
  let res = {}
  Object.keys(components).forEach((key) => {
    if (components[key].type !== "CONTAINER_NODE") {
      res = { ...res, [key]: components[key] }
    }
  })

  return res
}

export function flattenDslToArray(componentNodes: ComponentsState) {
  let res: ComponentMapNode[] = []
  Object.keys(componentNodes).forEach((key) => {
    if (componentNodes[key].containerType !== "EDITOR_DOT_PANEL") {
      res.push(componentNodes[key])
    }
  })

  return res
}

export const getComponentMap = (state: RootState) => {
  return state.currentApp.components
}

export const getRootComponentNode = createSelector(
  [getComponentMap],
  (components) => components.root,
)

export const getComponentNodeBySingleSelected = createSelector(
  [getComponentMap, getSelectedComponentDisplayNames],
  (components, selectedComponentDisplayNames) => {
    if (selectedComponentDisplayNames.length === 1) {
      return components[selectedComponentDisplayNames[0]]
    }
    return null
  },
)

const getAllDescendantNodeDisplayNames = (
  nodeDisplayName: string,
  components: ComponentsState,
) => {
  const node = components[nodeDisplayName]
  const queue = [node]
  let res: string[] = []
  while (queue.length > 0) {
    const head = queue[queue.length - 1]
    res.push(head.displayName)
    queue.pop()
    if (head.childrenNode) {
      head.childrenNode.forEach((child) => {
        if (components[child]) {
          queue.push(components[child])
        }
      })
    }
  }
  return res
}

export const getCurrentAppPageNames = createSelector(
  [getComponentMap],
  (components) => {
    const rootNodeProps = components.root.props
    if (!components || !rootNodeProps || !rootNodeProps.pageSortedKey)
      return [] as string[]
    const pageDisplayNames = rootNodeProps.pageSortedKey as string[]
    const passCheckedDisplayNames: string[] = []
    pageDisplayNames.forEach((pageDisplayName) => {
      const pageNode = components[pageDisplayName]
      if (!pageNode || !Array.isArray(pageNode.childrenNode)) return
      passCheckedDisplayNames.push(pageNode.displayName)
    })
    return passCheckedDisplayNames
  },
)

export const getPageNameMapDescendantNodeDisplayNames = createSelector(
  [getComponentMap],
  (components) => {
    const rootNode = components.root
    const rootNodeProps = rootNode?.props

    if (!rootNode || !rootNodeProps || !rootNodeProps.pageSortedKey) return {}
    const pageDisplayNames = rootNodeProps.pageSortedKey as string[]
    const pageNameMapHasNodeDisplayNames: Record<string, string[]> = {}
    pageDisplayNames.forEach((pageDisplayName) => {
      const pageNode = components[pageDisplayName]
      if (!pageNode || !Array.isArray(pageNode.childrenNode)) return
      const descendantNodeDisplayNames = getAllDescendantNodeDisplayNames(
        pageNode.displayName,
        components,
      )
      pageNameMapHasNodeDisplayNames[pageDisplayName] =
        descendantNodeDisplayNames
    })
    return pageNameMapHasNodeDisplayNames
  },
)

export const getAllComponentDisplayNameMapProps = createSelector(
  [getComponentMap, getPageNameMapDescendantNodeDisplayNames],
  (componentsMap, pageNameMapDescendantNodeDisplayNames) => {
    if (componentsMap == null) {
      return null
    }
    const reversePageNameMapDescendantNodeDisplayNames: Record<string, string> =
      {}

    Object.keys(pageNameMapDescendantNodeDisplayNames).forEach((pageName) => {
      pageNameMapDescendantNodeDisplayNames[pageName].forEach((displayName) => {
        reversePageNameMapDescendantNodeDisplayNames[displayName] = pageName
      })
    })

    const filteredResult = filterContainerNode(componentsMap)
    if (!filteredResult) return
    const res: Record<string, any> = {}
    Object.keys(filteredResult).forEach((key) => {
      res[key] = {
        ...filteredResult[key].props,
        displayName: filteredResult[key].displayName,
        $parentNode: filteredResult[key].parentNode,
        $type: "WIDGET",
        $widgetType: filteredResult[key].type,
        $childrenNode: filteredResult[key].childrenNode,
        $parentPageName: reversePageNameMapDescendantNodeDisplayNames[key],
      }
    })
    return res
  },
)

export const getAllComponentDisplayNameMapLayoutInfo = createSelector(
  [getComponentMap],
  (components) => {
    if (components == null) {
      return null
    }
    const res: Record<string, WidgetLayoutInfo> = {}
    Object.keys(components).forEach((key) => {
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
        childrenNode,
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

export const getAllContainerWidget = createSelector(
  [getComponentMap],
  (components) => {
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
  },
)

export const getFlattenArrayComponentNodes = createSelector(
  [getComponentMap],
  (components) => {
    if (components == null) {
      return null
    }
    return flattenDslToArray(components)
  },
)

export const getCurrentPageNode = createSelector(
  [getComponentMap],
  (components) => {
    const rootDSL = components.root
    if (rootDSL == null || !rootDSL.props) {
      return null
    }
    const { currentPageIndex, pageSortedKey } = rootDSL.props
    const currentPageDisplayName = pageSortedKey[currentPageIndex]
    const currentPage = rootDSL.childrenNode.find(
      (nodeDisplayName) => nodeDisplayName === currentPageDisplayName,
    )
    if (!currentPage) return null
    return components[currentPage]
  },
)

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

export const getRootNodeProps = createSelector(
  [getComponentMap],
  (rootNode) => {
    if (!rootNode)
      return {
        currentPageIndex: 0,
        pageSortedKey: ["page1"],
        homepageDisplayName: "page1",
      }
    return rootNode.props
  },
)

export const getContainerListWidget = createSelector(
  [getFlattenArrayComponentNodes],
  (componentNodes) => {
    if (!Array.isArray(componentNodes)) {
      return null
    }

    return componentNodes.filter((node) => {
      return node.type === "LIST_WIDGET" || node.type === "GRID_LIST_WIDGET"
    })
  },
)

export const getContainerListDisplayNameMappedChildrenNodeDisplayName =
  createSelector(
    [getContainerListWidget, getComponentMap],
    (listNodes, components) => {
      const displayNameMappedChildren: Record<string, string[]> = {}
      if (!listNodes) return displayNameMappedChildren
      const dfsWithListNode = (
        containerNode: ComponentMapNode,
        result: Record<string, string[]>,
        listDisplayName: string,
      ) => {
        containerNode.childrenNode?.forEach((nodeDisplayName) => {
          if (!Array.isArray(get(result, listDisplayName))) {
            set(result, listDisplayName, [])
          }
          result[listDisplayName].push(nodeDisplayName)
          dfsWithListNode(components[nodeDisplayName], result, listDisplayName)
        })
      }
      listNodes.forEach((node) => {
        const containerNodeDisplayName = node.childrenNode[0]
        if (!Array.isArray(get(displayNameMappedChildren, node.displayName))) {
          set(displayNameMappedChildren, node.displayName, [])
        }

        if (containerNodeDisplayName) {
          displayNameMappedChildren[node.displayName].push(
            containerNodeDisplayName,
          )
          dfsWithListNode(
            components[containerNodeDisplayName],
            displayNameMappedChildren,
            node.displayName,
          )
        }
      })

      return displayNameMappedChildren
    },
  )

export const getViewportSizeSelector = createSelector(
  [getRootComponentNode],
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

function getNodeDepths(tree: ComponentsState) {
  const nodeDepths: Record<string, number> = {}
  function traverse(node: ComponentMapNode, depth: number) {
    nodeDepths[node.displayName] = depth
    if (node.childrenNode) {
      for (let i = 0; i < node.childrenNode.length; i++) {
        traverse(tree[node.childrenNode[i]], depth + 1)
      }
    }
  }
  traverse(tree.root, 0)
  return nodeDepths
}

export const getComponentDisplayNameMapDepth = createSelector(
  [getComponentMap],
  (components) => {
    if (!components) return {}
    return getNodeDepths(components)
  },
)

export const getOriginalGlobalData = createSelector(
  [getRootComponentNode],
  (rootNode) => {
    return (rootNode?.props?.globalData ?? {}) as Record<string, string>
  },
)

export const getOriginalGlobalDataNames = createSelector(
  [getRootComponentNode],
  (rootNode) => {
    return Object.keys(rootNode?.props?.globalData ?? {})
  },
)

export const getGlobalDataToActionList = createSelector(
  [getRootComponentNode],
  (rootNode) => {
    const globalData = (rootNode?.props?.globalData ?? {}) as Record<
      string,
      string
    >

    const result: ActionItem<GlobalDataActionContent>[] =
      Object.keys(globalData)?.map((key) => {
        return {
          actionID: key,
          displayName: key,
          actionType: "globalData",
          triggerMode: "manually",
          isVirtualResource: true,
          content: {
            initialValue: globalData[key],
          },
          transformer: {
            enable: false,
            rawData: "",
          },
          config: {
            public: false,
          },
        }
      }) ?? []

    return result
  },
)

export const getPageDisplayNameMapViewDisplayName = createSelector(
  [getComponentMap],
  (components) => {
    const rootNode = components.root
    if (!rootNode) return {}
    const pageDisplayNameMapViewDisplayName: Record<string, Set<string>> = {}
    const pageNodes = rootNode.childrenNode
    pageNodes.forEach((pageNode) => {
      pageDisplayNameMapViewDisplayName[pageNode] = new Set()
      const sectionNodes = components[pageNode].childrenNode
      sectionNodes.forEach((sectionNode) => {
        const sectionConfigs =
          components[sectionNode].props?.sectionViewConfigs ?? []
        sectionConfigs.forEach((sectionConfig: Record<string, string>) => {
          pageDisplayNameMapViewDisplayName[pageNode].add(sectionConfig.path)
        })
      })
    })
    return pageDisplayNameMapViewDisplayName
  },
)

export const getCurrentPageSortedKeys = createSelector(
  [getRootComponentNode],
  (rootNode) => {
    if (!rootNode) return []
    return rootNode.props?.pageSortedKey ?? []
  },
)

export const getWidgetCount = createSelector(
  [getComponentMap],
  (components) => {
    let count = 0
    Object.keys(components).forEach((key) => {
      if (components[key].type.endsWith("_WIDGET")) {
        count++
      }
    })
    return count
  },
)
