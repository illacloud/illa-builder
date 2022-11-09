import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  AddTargetPageSectionPayload,
  ComponentNode,
  ComponentsState,
  CopyComponentPayload,
  DeleteComponentNodePayload,
  DeleteTargetPageSectionPayload,
  PageNodeProps,
  RootComponentNodeProps,
  sortComponentNodeChildrenPayload,
  UpdateComponentDisplayNamePayload,
  UpdateComponentPropsPayload,
  UpdateComponentReflowPayload,
  UpdateTargetPageLayoutPayload,
  UpdateTargetPagePropsPayload,
  RootComponentNode,
  DeletePageNodePayload,
  AddSectionViewPayload,
  DeleteSectionViewPayload,
  SectionViewShape,
  UpdateSectionViewPropsPayload,
} from "@/redux/currentApp/editor/components/componentsState"
import { cloneDeep } from "lodash"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { isObject } from "@/utils/typeHelper"
import {
  UpdateComponentContainerPayload,
  UpdateComponentsShapePayload,
} from "@/redux/currentApp/editor/components/componentsPayload"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import {
  generateSectionConfig,
  generateSectionContainerConfig,
  layoutValueMapGenerateConfig,
} from "@/utils/generators/generatePageOrSectionConfig"

export const updateComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentsState>
> = (state, action) => {
  return action.payload
}

// update real-time
export const addComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode[]>
> = (state, action) => {
  action.payload.forEach((dealNode) => {
    if (state == null || dealNode.parentNode == null) {
      return state
    } else {
      const parentNode = searchDsl(state, dealNode.parentNode)
      if (parentNode != null) {
        if (dealNode.props) {
          dealNode.props = getNewWidgetPropsByUpdateSlice(
            dealNode.displayName,
            dealNode.props ?? {},
            dealNode.props ?? {},
          )
        }
        if (!Array.isArray(parentNode.childrenNode)) {
          parentNode.childrenNode = [dealNode]
        } else {
          parentNode.childrenNode.push(dealNode)
        }
      }
    }
  })
}

export const copyComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<CopyComponentPayload[]>
> = (state, action) => {
  action.payload.forEach((copyShape) => {
    const { newComponentNode, oldComponentNode } = copyShape
    if (state == null || newComponentNode.parentNode == null) {
      return state
    } else {
      const parentNode = searchDsl(state, newComponentNode.parentNode)
      if (parentNode != null) {
        if (newComponentNode.props) {
          newComponentNode.props = getNewWidgetPropsByUpdateSlice(
            newComponentNode.displayName,
            newComponentNode.props ?? {},
            newComponentNode.props ?? {},
          )
        }
        parentNode.childrenNode.push(newComponentNode)
      }
    }
  })
}

export const deleteComponentNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteComponentNodePayload>
> = (state, action) => {
  const { displayNames } = action.payload
  if (state == null) {
    return
  }
  const rootNode = state
  const allDisplayNames = [...displayNames]
  displayNames.forEach((value) => {
    const searchNode = searchDsl(rootNode, value)
    if (!searchNode) return
    const searchNodeChildNodes = searchNode.childrenNode
    searchNodeChildNodes?.forEach((node) => {
      allDisplayNames.push(node.displayName)
    })
    const parentNode = searchDsl(rootNode, searchNode.parentNode)
    if (parentNode == null) {
      return
    }
    const childrenNodes = parentNode.childrenNode
    if (childrenNodes == null) {
      return
    }

    const currentIndex = childrenNodes.findIndex((value) => {
      return value.displayName === searchNode.displayName
    })
    childrenNodes.splice(currentIndex, 1)
  })
  DisplayNameGenerator.removeDisplayNameMulti(allDisplayNames)
}

export const deletePageNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeletePageNodePayload>
> = (state, action) => {
  const { displayName } = action.payload
  if (state == null) {
    return
  }
  const rootNode = state
  const allDisplayNames = [displayName]

  const searchNode = searchDsl(rootNode, displayName)
  if (!searchNode) return
  const searchNodeChildNodes = searchNode.childrenNode
  searchNodeChildNodes?.forEach((node) => {
    allDisplayNames.push(node.displayName)
  })
  const parentNode = rootNode as RootComponentNode
  const childrenNodes = parentNode.childrenNode
  const currentIndex = childrenNodes.findIndex((value) => {
    return value.displayName === searchNode.displayName
  })
  childrenNodes.splice(currentIndex, 1)
  const indexOfSortedKey = parentNode.props.pageSortedKey.findIndex(
    (key) => key === displayName,
  )
  if (indexOfSortedKey === -1) return
  parentNode.props.pageSortedKey.splice(indexOfSortedKey, 1)
  if (
    indexOfSortedKey !== 0 &&
    parentNode.props.pageSortedKey[parentNode.props.currentPageIndex] ===
      displayName
  ) {
    parentNode.props.currentPageIndex = 0
  }

  if (
    parentNode.props.homepageDisplayName === displayName ||
    !parentNode.props.homepageDisplayName
  ) {
    parentNode.props.homepageDisplayName = parentNode.props.pageSortedKey[0]
  }
  DisplayNameGenerator.removeDisplayName(displayName)
}

export const sortComponentNodeChildrenReducer: CaseReducer<
  ComponentsState,
  PayloadAction<sortComponentNodeChildrenPayload>
> = (state, action) => {
  const { parentDisplayName, newChildrenNode } = action.payload
  const parentNode = searchDsl(state, parentDisplayName)
  if (!parentNode) return
  parentNode.childrenNode = newChildrenNode
}

export const updateComponentPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPropsPayload>
> = (state, action) => {
  const { displayName, updateSlice } = action.payload
  if (!isObject(updateSlice) || !displayName) {
    return
  }
  const node = searchDsl(state, displayName)
  if (!node) return
  const widgetProps = node.props || {}
  const clonedWidgetProps = cloneDeep(widgetProps)
  node.props = getNewWidgetPropsByUpdateSlice(
    displayName,
    updateSlice,
    clonedWidgetProps,
  )
}

export const updateMultiComponentPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPropsPayload[]>
> = (state, action) => {
  action.payload.forEach(({ displayName, updateSlice }) => {
    if (!isObject(updateSlice) || !displayName) {
      return
    }
    const node = searchDsl(state, displayName)
    if (!node) return
    const widgetProps = node.props || {}
    const clonedWidgetProps = cloneDeep(widgetProps)
    node.props = getNewWidgetPropsByUpdateSlice(
      displayName,
      updateSlice,
      clonedWidgetProps,
    )
  })
}

export const resetComponentPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {
  const componentNode = action.payload
  if (!componentNode) return
  const displayName = componentNode.displayName
  const node = searchDsl(state, displayName)
  if (!node) return
  node.props = componentNode.props
}

export const updateComponentDisplayNameReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentDisplayNamePayload>
> = (state, action) => {
  const { displayName, newDisplayName } = action.payload
  if (!newDisplayName || !displayName) {
    return
  }
  const node = searchDsl(state, displayName)
  if (!node) return
  node.displayName = newDisplayName
  if (Array.isArray(node.childrenNode)) {
    node.childrenNode.forEach((child) => {
      child.parentNode = newDisplayName
    })
  }
  const parentNode = searchDsl(state, node.parentNode)
  if (parentNode && parentNode.props) {
    if (Array.isArray(parentNode.props.pageSortedKey)) {
      const indexOfOldDisplayName = parentNode.props.pageSortedKey.findIndex(
        (originDisplayName) => originDisplayName === displayName,
      )
      if (indexOfOldDisplayName !== -1) {
        parentNode.props.pageSortedKey.splice(
          indexOfOldDisplayName,
          1,
          newDisplayName,
        )
      }
    }
    if (Array.isArray(parentNode.props.viewSortedKey)) {
      const indexOfOldDisplayName = parentNode.props.viewSortedKey.findIndex(
        (originDisplayName) => originDisplayName === displayName,
      )
      if (indexOfOldDisplayName !== -1) {
        parentNode.props.pageSortedKey.splice(
          indexOfOldDisplayName,
          1,
          newDisplayName,
        )
      }
    }
    if (parentNode.displayName === "root" && parentNode.props) {
      if (parentNode.props.homepageDisplayName === displayName) {
        parentNode.props.homepageDisplayName = newDisplayName
      }
      if (!parentNode.props.homepageDisplayName) {
        parentNode.props.homepageDisplayName = parentNode.props.pageSortedKey[0]
      }
    }
  }
}

export const updateComponentsShape: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentsShapePayload>
> = (state, action) => {
  action.payload.components.forEach((dealNode) => {
    const parentNode = searchDsl(state, dealNode.parentNode)
    if (parentNode != null) {
      const index = parentNode.childrenNode.findIndex((value) => {
        return value.displayName === dealNode.displayName
      })
      if (index > -1) {
        parentNode.childrenNode[index] = dealNode
      }
    }
  })
}

export const updateComponentContainerReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentContainerPayload>
> = (state, action) => {
  action.payload.updateSlice.forEach((slice) => {
    const currentNode = slice.component
    const oldParentDisplayName = slice.oldParentDisplayName
    const oldParentNode = searchDsl(state, oldParentDisplayName)
    let currentParentNode = searchDsl(state, currentNode.parentNode)
    if (oldParentNode == null || currentParentNode == null) return
    const oldChildrenNode = cloneDeep(oldParentNode.childrenNode)
    const oldIndex = oldChildrenNode.findIndex((node) => {
      return node.displayName === currentNode.displayName
    })
    if (oldIndex !== -1) {
      oldChildrenNode.splice(oldIndex, 1)
      oldParentNode.childrenNode = oldChildrenNode
    }

    currentParentNode = searchDsl(state, currentNode.parentNode)
    if (currentParentNode) {
      if (!Array.isArray(currentParentNode.childrenNode)) {
        currentParentNode.childrenNode = [currentNode]
      } else {
        currentParentNode.childrenNode.push(currentNode)
      }
    }
  })
}
export const updateComponentReflowReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentReflowPayload[]>
> = (state, action) => {
  const payloadArray = action.payload
  payloadArray.forEach((payload) => {
    const { parentDisplayName, childNodes } = payload
    const targetNode = searchDsl(state, parentDisplayName)
    if (targetNode) {
      const childNodesDisplayNamesMap = new Map()
      childNodes.forEach((node) => {
        childNodesDisplayNamesMap.set(node.displayName, node)
      })
      targetNode.childrenNode = targetNode.childrenNode?.map((node) => {
        if (childNodesDisplayNamesMap.has(node.displayName)) {
          const newPositionNode = childNodesDisplayNamesMap.get(
            node.displayName,
          )
          return {
            ...node,
            w: newPositionNode.w,
            h: newPositionNode.h,
            x: newPositionNode.x,
            y: newPositionNode.y,
          }
        }
        return node
      })
    }
  })
}

export const updateHeaderSectionReducer: CaseReducer<
  ComponentsState,
  PayloadAction<string>
> = (state, action) => {
  const { payload } = action
  const targetSection = searchDsl(state, "headerSection")
  if (targetSection) {
    targetSection.props = {
      ...targetSection.props,
      height: payload,
    }
  }
}

export const updateCurrentPagePropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<Partial<PageNodeProps>>
> = (state, action) => {
  if (!state?.props) return state
  const { currentPageIndex, pageSortedKey } = state.props
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const currentPage = state.childrenNode.find(
    (node) => node.displayName === currentPageDisplayName,
  )
  if (!currentPage) return state
  currentPage.props = {
    ...currentPage.props,
    ...action.payload,
  }
}

const transComponentNode = (node: ComponentNode, displayName: string[]) => {
  if (Array.isArray(node.childrenNode)) {
    node.childrenNode.forEach((child) => {
      displayName.push(child.displayName)
      transComponentNode(child, displayName)
    })
  }
}

export const updateTargetPageLayoutReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateTargetPageLayoutPayload>
> = (state, action) => {
  if (!state) return state
  const { pageName, layout } = action.payload
  const config = layoutValueMapGenerateConfig[layout]
  let targetPageNodeIndex = state.childrenNode.findIndex(
    (node) => node.displayName === pageName,
  )
  if (targetPageNodeIndex === -1) return state
  const targetPageNode = state.childrenNode[targetPageNodeIndex]
  const allComponentDisplayName: string[] = []
  transComponentNode(targetPageNode, allComponentDisplayName)
  const pageConfig = config(targetPageNode.displayName)
  DisplayNameGenerator.removeDisplayNameMulti(allComponentDisplayName)
  state.childrenNode.splice(targetPageNodeIndex, 1, pageConfig)
}

export const updateTargetPagePropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateTargetPagePropsPayload>
> = (state, action) => {
  if (!state?.props) return state
  const { pageName, newProps } = action.payload
  const currentPage = state.childrenNode.find(
    (node) => node.displayName === pageName,
  )
  if (!currentPage) return state
  currentPage.props = {
    ...currentPage.props,
    ...newProps,
  }
}

export const deleteTargetPageSectionReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteTargetPageSectionPayload>
> = (state, action) => {
  if (!state?.childrenNode) return state
  const { pageName, deleteSectionName, options } = action.payload
  const targetPageIndex = state.childrenNode.findIndex(
    (node) => node.displayName === pageName,
  )
  if (targetPageIndex === -1) return state
  const targetPage = cloneDeep(state.childrenNode[targetPageIndex])

  targetPage.props = {
    ...targetPage.props,
    ...options,
  }

  const targetPageChildrenNodeIndex = targetPage.childrenNode.findIndex(
    (node) => node.displayName === deleteSectionName,
  )
  if (targetPageChildrenNodeIndex === -1) return state
  targetPage.childrenNode.splice(targetPageChildrenNodeIndex, 1)
  state.childrenNode.splice(targetPageIndex, 1, targetPage)
}

export const addTargetPageSectionReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddTargetPageSectionPayload>
> = (state, action) => {
  if (!state?.childrenNode) return state
  const { pageName, addedSectionName, options } = action.payload
  const targetPageIndex = state.childrenNode.findIndex(
    (node) => node.displayName === pageName,
  )
  if (targetPageIndex === -1) return state
  const targetPage = cloneDeep(state.childrenNode[targetPageIndex])

  targetPage.props = {
    ...targetPage.props,
    ...options,
  }

  const config = generateSectionConfig(pageName, addedSectionName)
  if (!config) return state
  targetPage.childrenNode.push(config)
  state.childrenNode.splice(targetPageIndex, 1, targetPage)
}

export const updateRootNodePropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<Partial<RootComponentNodeProps>>
> = (state, action) => {
  if (!state) return state
  if (!state.props) {
    state.props = action.payload
  } else {
    state.props = {
      ...state.props,
      ...action.payload,
    }
  }
}

export const addPageNodeWithSortOrderReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode[]>
> = (state, action) => {
  action.payload.forEach((node) => {
    const parentNode = searchDsl(
      state,
      node.parentNode,
    ) as RootComponentNode | null
    if (!parentNode) return
    parentNode.props.pageSortedKey.push(node.displayName)
    if (!Array.isArray(parentNode.childrenNode)) {
      parentNode.childrenNode = [node]
    } else {
      parentNode.childrenNode.push(node)
    }
  })
}

export const addSectionViewReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddSectionViewPayload>
> = (state, action) => {
  const { parentNodeName, containerNode, newSectionViewConfig } = action.payload
  const parentNode = searchDsl(state, parentNodeName)
  if (!parentNode || !parentNode.props) return
  parentNode.childrenNode.push(containerNode)
  parentNode.props.viewSortedKey.push(containerNode.displayName)
  parentNode.props.sectionViewConfigs.push(newSectionViewConfig)
}

export const updateSectionViewPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateSectionViewPropsPayload>
> = (state, action) => {
  const { parentNodeName, newProps } = action.payload
  const parentNode = searchDsl(state, parentNodeName)
  if (!parentNode || !parentNode.props) return
  parentNode.props = {
    ...parentNode.props,
    ...newProps,
  }
}

export const deleteSectionViewReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteSectionViewPayload>
> = (state, action) => {
  const { viewDisplayName } = action.payload
  const currentNode = searchDsl(state, viewDisplayName)
  if (!currentNode) return
  const parentNode = searchDsl(state, currentNode.parentNode)
  if (!parentNode || !parentNode.props) return
  const currentIndex = parentNode.childrenNode.findIndex(
    (node) => node.displayName === viewDisplayName,
  )
  if (currentIndex === -1) return
  parentNode.childrenNode.splice(currentIndex, 1)
  const viewSortedKeyIndex = parentNode.props.viewSortedKey.findIndex(
    (key: string) => key === viewDisplayName,
  )
  if (viewSortedKeyIndex === -1) return
  parentNode.props.viewSortedKey.splice(viewSortedKeyIndex, 1)
  const sectionViewConfigsIndex = parentNode.props.sectionViewConfigs.findIndex(
    (config: SectionViewShape) => config.viewDisplayName === viewDisplayName,
  )
  if (sectionViewConfigsIndex === -1) return
  parentNode.props.sectionViewConfigs.splice(sectionViewConfigsIndex, 1)
}
