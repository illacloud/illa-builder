import {
  ComponentMapNode,
  ComponentTreeNode,
  SectionViewShape,
} from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { klona } from "klona/json"
import { difference, set, unset } from "lodash-es"
import {
  generateNewViewItem,
  generateNewViewItemFromBodySectionConfig,
} from "@/page/App/components/PagePanel/Components/ViewsList/utils"
import {
  BatchUpdateComponentNodeLayoutInfoPayload,
  LayoutInfo,
  UpdateComponentNodeLayoutInfoPayload,
  UpdateComponentPositionPayload,
  UpdateComponentSlicePropsPayload,
} from "@/redux/currentApp/components/componentsPayload"
import { searchComponentFromMap } from "@/redux/currentApp/components/componentsSelector"
import {
  AddModalComponentPayload,
  AddSectionViewByConfigPayload,
  AddSectionViewPayload,
  AddTargetPageSectionPayload,
  ComponentsInitialState,
  ComponentsState,
  DeleteComponentNodePayload,
  DeleteCurrentPageStylePayload,
  DeleteGlobalStatePayload,
  DeletePageNodePayload,
  DeleteSectionViewPayload,
  DeleteSubPageViewNodePayload,
  DeleteTargetPageSectionPayload,
  RootComponentNode,
  RootComponentNodeProps,
  SetGlobalStatePayload,
  SortComponentNodeChildrenPayload,
  UpdateComponentDisplayNamePayload,
  UpdateComponentNodeHeightPayload,
  UpdateComponentPropsPayload,
  UpdateComponentReflowPayload,
  UpdateCurrentPageStylePayload,
  UpdateSectionViewPropsPayload,
  UpdateTargetPageLayoutPayload,
  UpdateTargetPagePropsPayload,
  ViewportSizeType,
} from "@/redux/currentApp/components/componentsState"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { flatTreeToMap, transTreeToMap } from "@/utils/componentNode/flatTree"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import {
  generateModalSectionConfig,
  generateSectionConfig,
  generateSectionContainerConfig,
  layoutValueMapGenerateConfig,
} from "@/utils/generators/generatePageOrSectionConfig"
import { isObject } from "@/utils/typeHelper"

function removeDisplayNames(
  targetComponentNode: ComponentMapNode,
  components: ComponentsState,
) {
  const needDeleteDisplayNames: string[] = [targetComponentNode.displayName]
  delete components[targetComponentNode.displayName]
  targetComponentNode.childrenNode?.forEach((childDisplayName) => {
    return needDeleteDisplayNames.push(
      ...removeDisplayNames(components[childDisplayName], components),
    )
  })

  return needDeleteDisplayNames
}

export const initComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentsState>
> = (state, action) => {
  return action.payload
}

// update real-time
export const addComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentTreeNode[]>
> = (state, action) => {
  action.payload.forEach((dealRootNode) => {
    const dealNodeMap = flatTreeToMap(dealRootNode)
    if (state == null || dealRootNode.parentNode == null) {
      return state
    } else {
      const parentNode = searchComponentFromMap(state, dealRootNode.parentNode)
      if (parentNode != null) {
        if (dealRootNode.props) {
          dealRootNode.props = getNewWidgetPropsByUpdateSlice(
            dealRootNode.props ?? {},
            {},
          )
        }
        if (!Array.isArray(parentNode.childrenNode)) {
          parentNode.childrenNode = [dealRootNode.displayName]
        } else {
          parentNode.childrenNode.push(dealRootNode.displayName)
        }
        Object.keys(dealNodeMap).forEach((key) => {
          const node = dealNodeMap[key]
          if (node.props) {
            node.props = getNewWidgetPropsByUpdateSlice(node.props ?? {}, {})
          }
          state[key] = node
        })
      }
    }
  })
}

export const addModalComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddModalComponentPayload>
> = (state, action) => {
  const { currentPageDisplayName, modalComponentNode } = action.payload
  if (!currentPageDisplayName || !modalComponentNode) {
    return state
  }
  const currentPageNode = searchComponentFromMap(state, currentPageDisplayName)
  if (currentPageNode == null || !Array.isArray(currentPageNode.childrenNode))
    return state
  const modalSectionNodeDisplayName = currentPageNode.childrenNode.find(
    (childDisplayName) => {
      return state[childDisplayName].type === "MODAL_SECTION_NODE"
    },
  )
  if (!modalSectionNodeDisplayName) {
    const newModalSectionNode = transTreeToMap(
      generateModalSectionConfig(currentPageDisplayName, "modalSection"),
    )
    modalComponentNode.parentNode = newModalSectionNode.displayName
    newModalSectionNode.childrenNode = [modalComponentNode.displayName]
    currentPageNode.childrenNode.push(newModalSectionNode.displayName)
    state[newModalSectionNode.displayName] = newModalSectionNode
  } else {
    modalComponentNode.parentNode = modalSectionNodeDisplayName
    if (!Array.isArray(state[modalSectionNodeDisplayName].childrenNode)) {
      state[modalSectionNodeDisplayName].childrenNode = []
    }
    const needAddNode = flatTreeToMap(modalComponentNode)
    Object.keys(needAddNode).forEach((key) => {
      const node = needAddNode[key]
      if (node.props) {
        node.props = getNewWidgetPropsByUpdateSlice(node.props ?? {}, {})
      }
      state[key] = node
    })
    state[modalSectionNodeDisplayName].childrenNode.push(
      modalComponentNode.displayName,
    )
  }
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
  const tempTargetNode = searchComponentFromMap(rootNode, displayNames[0])
  if (!tempTargetNode) return
  const parentNodeDisplayName = tempTargetNode.parentNode
  const parentNode = searchComponentFromMap(rootNode, parentNodeDisplayName)
  if (!parentNode || !Array.isArray(parentNode.childrenNode)) return
  let needRemoveDisplayName: string[] = []
  const newChildrenNode = parentNode.childrenNode.filter((childDisplayName) => {
    if (displayNames.includes(childDisplayName)) {
      const removedDisplayNames = removeDisplayNames(
        state[childDisplayName],
        state,
      )
      needRemoveDisplayName.push(...removedDisplayNames)
      return false
    }
    return true
  })
  parentNode.childrenNode = newChildrenNode
  DisplayNameGenerator.removeDisplayNameMulti(needRemoveDisplayName)
}

export const deletePageNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeletePageNodePayload>
> = (state, action) => {
  const { displayName } = action.payload
  if (state == null) {
    return
  }
  const rootNode = state.root

  const searchNode = searchComponentFromMap(state, displayName)
  if (!searchNode) return
  const parentNode = rootNode
  const childrenNodes = parentNode.childrenNode
  const currentIndex = childrenNodes.findIndex((value) => {
    return value === searchNode.displayName
  })
  if (currentIndex === -1) return
  const indexOfSortedKey = parentNode.props?.pageSortedKey.findIndex(
    (key: string) => key === displayName,
  )
  if (indexOfSortedKey === -1) return
  const targetNode = childrenNodes[currentIndex]
  const needDeleteDisplayNames = removeDisplayNames(state[targetNode], state)
  DisplayNameGenerator.removeDisplayNameMulti(needDeleteDisplayNames)
  childrenNodes.splice(currentIndex, 1)
  parentNode.props!.pageSortedKey.splice(indexOfSortedKey, 1)
}

export const sortComponentNodeChildrenReducer: CaseReducer<
  ComponentsState,
  PayloadAction<SortComponentNodeChildrenPayload>
> = (state, action) => {
  const { parentDisplayName, newChildrenNode } = action.payload
  const parentNode = searchComponentFromMap(state, parentDisplayName)
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
  const node = searchComponentFromMap(state, displayName)
  if (!node) return
  const widgetProps = node.props || {}
  const clonedWidgetProps = klona(widgetProps)
  node.props = getNewWidgetPropsByUpdateSlice(updateSlice, clonedWidgetProps)
}

export const setComponentPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPropsPayload>
> = (state, action) => {
  const { displayName, updateSlice } = action.payload
  if (!isObject(updateSlice) || !displayName) {
    return
  }
  const node = searchComponentFromMap(state, displayName)
  if (!node) return
  node.props = getNewWidgetPropsByUpdateSlice(updateSlice, {})
}

export const updateMultiComponentPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPropsPayload[]>
> = (state, action) => {
  action.payload.forEach(({ displayName, updateSlice }) => {
    if (!isObject(updateSlice) || !displayName) {
      return
    }
    const node = searchComponentFromMap(state, displayName)
    if (!node) return
    const widgetProps = node.props || {}
    const clonedWidgetProps = klona(widgetProps)
    node.props = getNewWidgetPropsByUpdateSlice(updateSlice, clonedWidgetProps)
  })
}

export const batchUpdateMultiComponentSlicePropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentSlicePropsPayload[]>
> = (state, action) => {
  action.payload.forEach(({ displayName, propsSlice }) => {
    if (!isObject(propsSlice) || !displayName) {
      return
    }
    const node = searchComponentFromMap(state, displayName)
    if (!node) return
    const widgetProps = node.props || {}
    const clonedWidgetProps = klona(widgetProps)
    Object.keys(propsSlice).forEach((path) => {
      const newValue = propsSlice[path]
      set(clonedWidgetProps, path, newValue)
    })
    node.props = clonedWidgetProps
  })
}

export const updateComponentDisplayNameReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentDisplayNamePayload>
> = (state, action) => {
  const { displayName, newDisplayName } = action.payload
  DisplayNameGenerator.removeDisplayName(displayName)
  DisplayNameGenerator.addDisplayNames([newDisplayName])
  if (!newDisplayName || !displayName) {
    return
  }
  const node = searchComponentFromMap(state, displayName)
  if (!node) return
  delete state[displayName]
  node.displayName = newDisplayName
  state[newDisplayName] = node
  if (Array.isArray(node.childrenNode)) {
    node.childrenNode.forEach((child) => {
      state[child].parentNode = newDisplayName
    })
  }
  const parentNode = searchComponentFromMap(state, node.parentNode)
  if (parentNode && parentNode.props) {
    parentNode.childrenNode = parentNode.childrenNode.map((child) => {
      if (child === displayName) {
        return newDisplayName
      }
      return child
    })
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

const scaleChildrenNodeHelper = (
  state: ComponentsState,
  displayName: string,
  columnNumberWhenDrag: number,
  columnNumberWhenDrop: number,
) => {
  const targetNode = searchComponentFromMap(state, displayName)
  if (!targetNode) return
  if (Array.isArray(targetNode.childrenNode)) {
    targetNode.childrenNode.forEach((nodeDisplayName) =>
      scaleChildrenNodeHelper(
        state,
        nodeDisplayName,
        columnNumberWhenDrag,
        columnNumberWhenDrop,
      ),
    )
  }
  targetNode.w = Math.floor(
    targetNode.w * (columnNumberWhenDrop / columnNumberWhenDrag),
  )
  targetNode.x = Math.floor(
    targetNode.x * (columnNumberWhenDrop / columnNumberWhenDrag),
  )
}

export const updateComponentPositionReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPositionPayload>
> = (state, action) => {
  const {
    oldParentNodeDisplayName,
    newParentNodeDisplayName,
    updateSlices,
    columnNumberWhenDrag = 1,
    columnNumberWhenDrop = 1,
  } = action.payload

  if (oldParentNodeDisplayName === newParentNodeDisplayName) {
    updateSlices.forEach((slice) => {
      const currentNode = searchComponentFromMap(state, slice.displayName)
      if (!currentNode) return
      currentNode.x = slice.x
      currentNode.y = slice.y
      currentNode.w = slice.w
      currentNode.h = slice.h
    })
    return
  }

  updateSlices.forEach((slice) => {
    // delete Old
    const currentNode = searchComponentFromMap(state, slice.displayName)
    if (!currentNode) return
    const olaParentNode = searchComponentFromMap(
      state,
      oldParentNodeDisplayName,
    )
    if (!olaParentNode) return
    const currentIndex = olaParentNode.childrenNode.findIndex(
      (childDisplayName) => childDisplayName === currentNode.displayName,
    )
    if (currentIndex === -1) return
    olaParentNode.childrenNode.splice(currentIndex, 1)
    // add New
    const newParentNode = searchComponentFromMap(
      state,
      newParentNodeDisplayName,
    )
    if (!newParentNode) return
    currentNode.parentNode = newParentNodeDisplayName
    currentNode.x = slice.x
    currentNode.y = slice.y
    currentNode.w = slice.w
    currentNode.h = slice.h
    if (Array.isArray(currentNode.childrenNode)) {
      currentNode.childrenNode.forEach((childDisplayName) =>
        scaleChildrenNodeHelper(
          state,
          childDisplayName,
          columnNumberWhenDrag,
          columnNumberWhenDrop,
        ),
      )
    }
    if (!Array.isArray(newParentNode.childrenNode)) {
      newParentNode.childrenNode = [currentNode.displayName]
    } else {
      newParentNode.childrenNode.push(currentNode.displayName)
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
    const targetNode = searchComponentFromMap(state, parentDisplayName)
    if (targetNode) {
      childNodes.forEach((node) => {
        state[node.displayName] = {
          ...state[node.displayName],
          w: node.w,
          h: node.h,
          x: node.x,
          y: node.y,
        }
      })
    }
  })
}

export const updateTargetPageLayoutReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateTargetPageLayoutPayload>
> = (state, action) => {
  if (!state) return state
  const { pageName, layout, originPageNode } = action.payload
  const rootNode = state.root
  let targetPageNodeIndex = rootNode.childrenNode.findIndex(
    (nodeDisplayName) => nodeDisplayName === pageName,
  )
  if (layout !== "Custom") {
    const config = layoutValueMapGenerateConfig[layout]

    if (targetPageNodeIndex === -1) return state
    const targetPageNode = rootNode.childrenNode[targetPageNodeIndex]
    if (!targetPageNode) return state
    const needRemoveDisplayName = removeDisplayNames(
      state[targetPageNode],
      state,
    )
    const pageConfig = config(targetPageNode)
    const needAddNode = originPageNode ?? pageConfig

    DisplayNameGenerator.removeDisplayNameMulti(needRemoveDisplayName)
    rootNode.childrenNode.splice(
      targetPageNodeIndex,
      1,
      needAddNode.displayName,
    )
    const needAddMapNode = flatTreeToMap(needAddNode)
    Object.keys(needAddMapNode).forEach((displayName) => {
      state[displayName] = needAddMapNode[displayName]
    })
  } else {
    const needAddMapNode = flatTreeToMap(originPageNode!)
    Object.keys(needAddMapNode).forEach((displayName) => {
      state[displayName] = needAddMapNode[displayName]
    })
    rootNode.childrenNode.splice(
      targetPageNodeIndex,
      1,
      originPageNode!.displayName,
    )
  }
}

export const updateTargetPagePropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateTargetPagePropsPayload>
> = (state, action) => {
  const rootNode = state.root
  if (!rootNode?.props) return state
  const { pageName, newProps } = action.payload
  const currentPage = rootNode.childrenNode.find(
    (childDisplayName) => childDisplayName === pageName,
  )
  if (!currentPage) return state
  state[currentPage].props = {
    ...state[currentPage].props,
    ...newProps,
  }
}

const generationPageOptionsWhenDelete = (
  deletedSectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection",
) => {
  switch (deletedSectionName) {
    case "leftSection": {
      return {
        hasLeft: false,
        leftWidth: 0,
        leftPosition: "NONE",
        layout: "Custom",
      }
    }
    case "rightSection": {
      return {
        hasRight: false,
        rightWidth: 0,
        rightPosition: "NONE",
        layout: "Custom",
      }
    }
    case "headerSection": {
      return {
        hasHeader: false,
        topHeight: 0,
        layout: "Custom",
      }
    }
    case "footerSection": {
      return {
        hasFooter: false,
        bottomHeight: 0,
        layout: "Custom",
      }
    }
  }
}

export const deleteTargetPageSectionReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteTargetPageSectionPayload>
> = (state, action) => {
  const rootNode = state.root
  if (!rootNode?.childrenNode) return state
  const { pageName, deleteSectionName } = action.payload
  const targetPageIndex = rootNode.childrenNode.findIndex(
    (childDisplayName) => childDisplayName === pageName,
  )
  if (targetPageIndex === -1) return state
  const targetPage = state[rootNode.childrenNode[targetPageIndex]]

  targetPage.props = {
    ...targetPage.props,
    ...generationPageOptionsWhenDelete(deleteSectionName),
  }

  const targetPageChildrenNodeIndex = targetPage.childrenNode.findIndex(
    (childDisplayName) => childDisplayName === deleteSectionName,
  )
  if (targetPageChildrenNodeIndex === -1) return state
  const targetPageChildeNode =
    targetPage.childrenNode[targetPageChildrenNodeIndex]
  const needDeleteDisplayNames = removeDisplayNames(
    state[targetPageChildeNode],
    state,
  )
  DisplayNameGenerator.removeDisplayNameMulti(needDeleteDisplayNames)
  targetPage.childrenNode.splice(targetPageChildrenNodeIndex, 1)
  rootNode.childrenNode.splice(targetPageIndex, 1, targetPage.displayName)
}

const generationPageOptionsWhenAdd = (
  deletedSectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection",
) => {
  switch (deletedSectionName) {
    case "leftSection": {
      return {
        hasLeft: true,
        leftWidth: 20,
        leftPosition: "FULL",
        layout: "Custom",
      }
    }
    case "rightSection": {
      return {
        hasRight: true,
        rightWidth: 20,
        rightPosition: "FULL",
        layout: "Custom",
      }
    }
    case "headerSection": {
      return {
        hasHeader: true,
        topHeight: 96,
        layout: "Custom",
      }
    }
    case "footerSection": {
      return {
        hasFooter: true,
        bottomHeight: 96,
        layout: "Custom",
      }
    }
  }
}

export const addTargetPageSectionReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddTargetPageSectionPayload>
> = (state, action) => {
  const rootNode = state.root
  if (!rootNode?.childrenNode) return state
  const { pageName, addedSectionName, originSectionNode } = action.payload
  const targetPageIndex = rootNode.childrenNode.findIndex(
    (childDisplayName) => childDisplayName === pageName,
  )
  if (targetPageIndex === -1) return state
  const targetPage = state[rootNode.childrenNode[targetPageIndex]]

  targetPage.props = {
    ...targetPage.props,
    ...generationPageOptionsWhenAdd(addedSectionName),
  }

  if (originSectionNode) {
    const newOriginSectionNode = klona(originSectionNode)
    newOriginSectionNode.parentNode = targetPage.displayName
    targetPage.childrenNode.push(newOriginSectionNode.displayName)
    const needAddMapNode = flatTreeToMap(newOriginSectionNode)
    Object.keys(needAddMapNode).forEach((displayName) => {
      state[displayName] = needAddMapNode[displayName]
    })
  } else {
    let bodySectionSubPaths: string[] = []
    const bodySectionNode = targetPage.childrenNode.find(
      (childDisplayName) => childDisplayName === "bodySection",
    )
    if (bodySectionNode) {
      bodySectionSubPaths =
        state[bodySectionNode].props?.sectionViewConfigs.map(
          (config: Record<string, string>) => config.path,
        ) ?? []
    }
    if (bodySectionSubPaths.length === 0) {
      bodySectionSubPaths = ["sub-page1"]
    }
    const config = generateSectionConfig(
      pageName,
      addedSectionName,
      bodySectionSubPaths,
    )
    if (!config) return state
    targetPage.childrenNode.push(config.displayName)
    const needAddMapNode = flatTreeToMap(config)
    Object.keys(needAddMapNode).forEach((displayName) => {
      state[displayName] = needAddMapNode[displayName]
    })
  }
}

export const updateRootNodePropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<Partial<RootComponentNodeProps>>
> = (state, action) => {
  const rootNode = state.root
  if (!rootNode) return state
  if (!rootNode.props) {
    rootNode.props = action.payload
  } else {
    rootNode.props = {
      ...rootNode.props,
      ...action.payload,
    }
  }
}

export const addPageNodeWithSortOrderReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentTreeNode>
> = (state, action) => {
  const node = action.payload
  const parentNode = searchComponentFromMap(
    state,
    node.parentNode,
  ) as RootComponentNode | null
  if (!parentNode) return
  parentNode.props.pageSortedKey.push(node.displayName)
  if (!Array.isArray(parentNode.childrenNode)) {
    parentNode.childrenNode = [node.displayName]
  } else {
    parentNode.childrenNode.push(node.displayName)
  }
  const needAddMapNode = flatTreeToMap(node)
  Object.keys(needAddMapNode).forEach((displayName) => {
    state[displayName] = needAddMapNode[displayName]
  })
}

export const addSectionViewHelper = (
  sectionViewNodeConfig: ComponentTreeNode,
  sectionViewConfig: SectionViewShape,
  sectionNode: ComponentMapNode,
  originChildrenNode?: ComponentTreeNode[],
) => {
  if (originChildrenNode && Array.isArray(originChildrenNode)) {
    let cloneDeepChildrenNode = JSON.parse(
      JSON.stringify(originChildrenNode),
    ) as ComponentTreeNode[]
    cloneDeepChildrenNode = cloneDeepChildrenNode.map((node) => ({
      ...node,
      parentNode: sectionViewNodeConfig.displayName,
    }))
    sectionViewNodeConfig.childrenNode = cloneDeepChildrenNode
  }
  if (Array.isArray(sectionNode.childrenNode)) {
    sectionNode.childrenNode.push(sectionViewNodeConfig.displayName)
  } else {
    sectionNode.childrenNode = [sectionViewNodeConfig.displayName]
  }
  sectionNode.props!.viewSortedKey.push(sectionViewNodeConfig.displayName)
  sectionNode.props!.sectionViewConfigs.push(sectionViewConfig)
}

export const addSectionViewReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddSectionViewPayload>
> = (state, action) => {
  const { parentNodeName, sectionName, originChildrenNode } = action.payload

  const parentNode = searchComponentFromMap(state, parentNodeName)
  if (!parentNode || !parentNode.props) return
  let bodySectionSubPaths: string[] = []
  if (sectionName !== "bodySection") {
    const pageNode = searchComponentFromMap(state, parentNode.parentNode)
    if (!pageNode) return
    const bodySectionNodeDisplayName = pageNode.childrenNode.find(
      (childDisplayName) => childDisplayName === "bodySection",
    )
    if (!bodySectionNodeDisplayName) return
    bodySectionSubPaths =
      state[bodySectionNodeDisplayName].props?.sectionViewConfigs.map(
        (config: Record<string, string>) => config.path,
      ) ?? []
  }

  const config = generateSectionContainerConfig(
    parentNodeName,
    `${sectionName}Container`,
  )
  const hasPaths = parentNode.props.sectionViewConfigs.map(
    (item: SectionViewShape) => item.path,
  )
  const diffSubPaths = difference(bodySectionSubPaths, hasPaths)

  const newSectionViewConfig = generateNewViewItemFromBodySectionConfig(
    hasPaths,
    config.displayName,
    parentNodeName,
    diffSubPaths,
  )
  addSectionViewHelper(
    config,
    newSectionViewConfig,
    parentNode,
    originChildrenNode,
  )
  const needAddMapNode = flatTreeToMap(config)
  Object.keys(needAddMapNode).forEach((displayName) => {
    state[displayName] = needAddMapNode[displayName]
  })
}

export const addSectionViewConfigByConfigReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddSectionViewByConfigPayload>
> = (state, action) => {
  const {
    parentNodeName,
    originChildrenNode,
    sectionViewNode,
    sectionViewConfig,
  } = action.payload
  const parentNode = searchComponentFromMap(state, parentNodeName)
  if (!parentNode || !parentNode.props) return
  addSectionViewHelper(
    sectionViewNode,
    sectionViewConfig,
    parentNode,
    originChildrenNode,
  )
  const needAddMapNode = flatTreeToMap(sectionViewNode)
  Object.keys(needAddMapNode).forEach((displayName) => {
    state[displayName] = needAddMapNode[displayName]
  })
}

export const updateSectionViewPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateSectionViewPropsPayload>
> = (state, action) => {
  const { parentNodeName, newProps } = action.payload
  const parentNode = searchComponentFromMap(state, parentNodeName)
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
  const currentNode = searchComponentFromMap(state, viewDisplayName)
  if (!currentNode) return
  const parentNode = searchComponentFromMap(state, currentNode.parentNode)
  if (!parentNode || !parentNode.props) return
  const currentIndex = parentNode.childrenNode.findIndex(
    (childDisplayName) => childDisplayName === viewDisplayName,
  )
  if (currentIndex === -1) return
  const viewSortedKeyIndex = parentNode.props.viewSortedKey.findIndex(
    (key: string) => key === viewDisplayName,
  )
  if (viewSortedKeyIndex === -1) return
  const sectionViewConfigsIndex = parentNode.props.sectionViewConfigs.findIndex(
    (config: SectionViewShape) => config.viewDisplayName === viewDisplayName,
  )
  if (sectionViewConfigsIndex === -1) return
  const targetNode = parentNode.childrenNode[currentIndex]
  if (!targetNode) return
  const needDeleteDisplayNames = removeDisplayNames(state[targetNode], state)
  DisplayNameGenerator.removeDisplayNameMulti(needDeleteDisplayNames)
  parentNode.childrenNode.splice(currentIndex, 1)
  parentNode.props.viewSortedKey.splice(viewSortedKeyIndex, 1)
  parentNode.props.sectionViewConfigs.splice(sectionViewConfigsIndex, 1)
}

export const updateViewportSizeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<{
    viewportWidth?: number
    viewportHeight?: number
    viewportSizeType?: ViewportSizeType
  }>
> = (state, action) => {
  const rootNode = state.root
  if (!rootNode) return
  if (!rootNode.props) rootNode.props = {}
  rootNode.props.viewportWidth = action.payload.viewportWidth
  rootNode.props.viewportHeight = action.payload.viewportHeight
  rootNode.props.viewportSizeType = action.payload.viewportSizeType
}

export const resetComponentsReducer: CaseReducer<
  ComponentsState,
  PayloadAction
> = () => {
  return ComponentsInitialState
}

const updateComponentLayoutInfoHelper = (
  state: ComponentsState,
  displayName: string,
  layoutInfo: Partial<LayoutInfo>,
) => {
  let currentNode = searchComponentFromMap(state, displayName)
  if (!currentNode || !layoutInfo || Object.keys(layoutInfo).length === 0)
    return
  ;(Object.keys(layoutInfo) as Partial<Array<keyof LayoutInfo>>).forEach(
    (key) => {
      currentNode![key as keyof LayoutInfo] = layoutInfo[
        key as keyof LayoutInfo
      ] as number
    },
  )
}

export const updateComponentNodeHeightReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentNodeHeightPayload>
> = (state, action) => {
  if (!state) return
  const { displayName, height } = action.payload
  const currentNode = searchComponentFromMap(state, displayName)
  if (!currentNode) return
  currentNode.h = Math.max(height, currentNode.minH)
}

export const updateComponentLayoutInfoReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentNodeLayoutInfoPayload>
> = (state, action) => {
  if (!state) return
  const { displayName, layoutInfo } = action.payload
  updateComponentLayoutInfoHelper(state, displayName, layoutInfo)
}

export const batchUpdateComponentLayoutInfoWhenReflowReducer: CaseReducer<
  ComponentsState,
  PayloadAction<BatchUpdateComponentNodeLayoutInfoPayload[]>
> = (state, action) => {
  if (!state) return
  action.payload.forEach((updateSlice) => {
    const { displayName, layoutInfo } = updateSlice
    updateComponentLayoutInfoHelper(state, displayName, layoutInfo)
  })
}

export const batchUpdateComponentLayoutInfoReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentNodeLayoutInfoPayload[]>
> = (state, action) => {
  if (!state) return
  action.payload.forEach((updateSlice) => {
    const { displayName, layoutInfo } = updateSlice
    updateComponentLayoutInfoHelper(state, displayName, layoutInfo)
  })
}

export const setGlobalStateReducer: CaseReducer<
  ComponentsState,
  PayloadAction<SetGlobalStatePayload>
> = (state, action) => {
  const rootNode = state.root
  if (!state || !rootNode) return
  const { value, key, oldKey } = action.payload
  const originGlobalData = rootNode.props?.globalData || {}
  if (oldKey && originGlobalData.hasOwnProperty(oldKey)) {
    delete originGlobalData[oldKey]
  }
  const newProps = {
    ...rootNode.props,
    globalData: {
      ...originGlobalData,
      [key]: value,
    },
  }
  rootNode.props = getNewWidgetPropsByUpdateSlice(
    newProps ?? {},
    rootNode.props ?? {},
  )
}

export const deleteGlobalStateByKeyReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteGlobalStatePayload>
> = (state, action) => {
  const rootNode = state.root
  if (!rootNode || !rootNode.props) return
  const { key } = action.payload
  const originGlobalData = rootNode.props?.globalData || {}
  if (
    (Object.hasOwn && Object.hasOwn(originGlobalData, key)) ||
    Object.prototype.hasOwnProperty.call(originGlobalData, key)
  )
    delete originGlobalData[key]
}

export const getNeedDeleteSectionViewDisplayNames = (
  components: ComponentsState,
  pageName: string,
  subPagePath: string,
) => {
  const pageNode = searchComponentFromMap(components, pageName)
  if (!pageNode) return []
  const sectionNodeDisplayNames = pageNode.childrenNode.filter(
    (displayName) => components[displayName].type !== "MODAL_SECTION_NODE",
  )
  let needDeleteDisplayNames: string[] = []
  sectionNodeDisplayNames.forEach((sectionNode) => {
    const sectionViewConfigs =
      components[sectionNode].props?.sectionViewConfigs ?? []
    const targetSectionViewConfig = sectionViewConfigs.filter(
      (config: Record<string, string>) => config.path === subPagePath,
    )
    const currentNeedDeleteDisplayNames = targetSectionViewConfig.map(
      (config: Record<string, string>) => config.viewDisplayName,
    )
    needDeleteDisplayNames.push(...currentNeedDeleteDisplayNames)
  })
  return needDeleteDisplayNames
}

export const deleteSubPageViewNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteSubPageViewNodePayload>
> = (state, action) => {
  const { pageName, subPagePath } = action.payload
  const rootNode = state.root
  if (!state || !rootNode) return
  const needDeleteSectionDisplayNames = getNeedDeleteSectionViewDisplayNames(
    state,
    pageName,
    subPagePath,
  )

  needDeleteSectionDisplayNames.forEach((displayName) => {
    const targetComponentNode = searchComponentFromMap(state, displayName)
    if (!targetComponentNode) return
    const parentNode = searchComponentFromMap(
      state,
      targetComponentNode.parentNode,
    )
    if (!parentNode) return
    parentNode.childrenNode = parentNode.childrenNode.filter(
      (childDisplayName) => childDisplayName !== displayName,
    )
    parentNode.props!.viewSortedKey = parentNode.props?.viewSortedKey.filter(
      (key: string) => key !== displayName,
    )
    parentNode.props!.sectionViewConfigs =
      parentNode.props?.sectionViewConfigs.filter(
        (config: Record<string, string>) =>
          config.viewDisplayName !== displayName,
      )
  })
  needDeleteSectionDisplayNames.flatMap((displayName) =>
    removeDisplayNames(state[displayName], state),
  )
  DisplayNameGenerator.removeDisplayNameMulti(needDeleteSectionDisplayNames)
}

export const updateSubPagePathReducer: CaseReducer<
  ComponentsState,
  PayloadAction<{
    pageName: string
    subPagePath: string
    oldSubPagePath: string
  }>
> = (state, action) => {
  const { pageName, subPagePath, oldSubPagePath } = action.payload
  const pageNode = searchComponentFromMap(state, pageName)
  if (!pageNode) return
  const sectionNodes = pageNode.childrenNode.filter(
    (displayName) => state[displayName].type !== "MODAL_SECTION_NODE",
  )
  sectionNodes.forEach((sectionNode) => {
    state[sectionNode].props?.sectionViewConfigs.forEach(
      (config: Record<string, string>) => {
        if (config.path === oldSubPagePath) {
          config.path = subPagePath
        }
      },
    )
  })
}

export const updateDefaultSubPagePathReducer: CaseReducer<
  ComponentsState,
  PayloadAction<{
    pageName: string
    subPagePath: string
  }>
> = (state, action) => {
  const { pageName, subPagePath } = action.payload
  const pageNode = searchComponentFromMap(state, pageName)
  if (!pageNode) return
  const sectionNodeDisplayNames = pageNode.childrenNode.filter(
    (sectionNodeDisplayName) =>
      state[sectionNodeDisplayName].type !== "MODAL_SECTION_NODE",
  )
  sectionNodeDisplayNames.forEach((displayName) => {
    state[displayName].props!.defaultViewKey = subPagePath
  })
}

export const addSubPageReducer: CaseReducer<
  ComponentsState,
  PayloadAction<{ pageName: string }>
> = (state, action) => {
  if (!state) return
  const pageNode = searchComponentFromMap(state, action.payload.pageName)
  if (!pageNode) return
  const bodySectionDisplayName = pageNode.childrenNode.find(
    (sectionDisplayName) => {
      return state[sectionDisplayName].showName === "bodySection"
    },
  )
  if (!bodySectionDisplayName) {
    return
  }
  const bodySectionNode = state[bodySectionDisplayName]
  if (!bodySectionNode) return
  const bodySectionConfig = generateSectionContainerConfig(
    bodySectionDisplayName,
    `bodySectionContainer`,
  )

  const hasKeys = bodySectionNode.props!.sectionViewConfigs.map(
    (item: SectionViewShape) => {
      return `${bodySectionDisplayName}-${item.path}`
    },
  )
  const newSectionViewConfig = generateNewViewItem(
    hasKeys,
    bodySectionConfig.displayName,
    bodySectionDisplayName,
  )
  if (Array.isArray(bodySectionNode.childrenNode)) {
    bodySectionNode.childrenNode.push(bodySectionConfig.displayName)
  } else {
    bodySectionNode.childrenNode = [bodySectionConfig.displayName]
  }
  const needAddMapNode = flatTreeToMap(bodySectionConfig)
  Object.keys(needAddMapNode).forEach((displayName) => {
    state[displayName] = needAddMapNode[displayName]
  })
  bodySectionNode.props!.viewSortedKey.push(bodySectionConfig.displayName)
  bodySectionNode.props!.sectionViewConfigs.push(newSectionViewConfig)
}

export const updateCurrentPageStyleReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateCurrentPageStylePayload>
> = (state, action) => {
  const pageNode = searchComponentFromMap(state, action.payload.pageName)
  if (!pageNode || !Array.isArray(pageNode.childrenNode)) return
  const targetSectionNodeDisplayName = pageNode.childrenNode.find(
    (childDisplayName) => {
      return state[childDisplayName].showName === action.payload.sectionName
    },
  )
  if (!targetSectionNodeDisplayName) return
  const targetSectionNode = state[targetSectionNodeDisplayName]
  if (!targetSectionNode.props) return
  if (!targetSectionNode.props.style) {
    targetSectionNode.props.style = action.payload.style
  } else {
    Object.keys(action.payload.style).forEach((key) => {
      if (action.payload.style[key] === undefined) {
        unset(targetSectionNode.props?.style ?? {}, key)
      }
      targetSectionNode.props!.style[key] = action.payload.style[key]
    })
  }
}

export const deleteCurrentPageStyleReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteCurrentPageStylePayload>
> = (state, action) => {
  const pageNode = searchComponentFromMap(state, action.payload.pageName)
  if (!pageNode || !Array.isArray(pageNode.childrenNode)) return
  const targetSectionNodeDisplayName = pageNode.childrenNode.find(
    (childDisplayName) => {
      return state[childDisplayName].showName === action.payload.sectionName
    },
  )
  if (
    !targetSectionNodeDisplayName ||
    !state[targetSectionNodeDisplayName].props
  )
    return
  unset(
    state[targetSectionNodeDisplayName].props?.style ?? {},
    action.payload.styleKey,
  )
}
