import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { cloneDeep, difference, set } from "lodash"
import {
  generateNewViewItem,
  generateNewViewItemFromBodySectionConfig,
} from "@/page/App/components/PagePanel/Components/ViewsList/utils"
import {
  BatchUpdateComponentNodeLayoutInfoPayload,
  LayoutInfo,
  UpdateComponentContainerPayload,
  UpdateComponentNodeLayoutInfoPayload,
  UpdateComponentSlicePropsPayload,
} from "@/redux/currentApp/editor/components/componentsPayload"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  AddModalComponentPayload,
  AddSectionViewByConfigPayload,
  AddSectionViewPayload,
  AddTargetPageSectionPayload,
  ComponentNode,
  ComponentsInitialState,
  ComponentsState,
  DeleteComponentNodePayload,
  DeleteGlobalStatePayload,
  DeletePageNodePayload,
  DeleteSectionViewPayload,
  DeleteSubPageViewNodePayload,
  DeleteTargetPageSectionPayload,
  ModalSectionNode,
  RootComponentNode,
  RootComponentNodeProps,
  SectionViewShape,
  SetGlobalStatePayload,
  SortComponentNodeChildrenPayload,
  UpdateComponentDisplayNamePayload,
  UpdateComponentNodeHeightPayload,
  UpdateComponentPropsPayload,
  UpdateComponentReflowPayload,
  UpdateSectionViewPropsPayload,
  UpdateTargetPageLayoutPayload,
  UpdateTargetPagePropsPayload,
  ViewportSizeType,
} from "@/redux/currentApp/editor/components/componentsState"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import {
  generateModalSectionConfig,
  generateSectionConfig,
  generateSectionContainerConfig,
  layoutValueMapGenerateConfig,
} from "@/utils/generators/generatePageOrSectionConfig"
import { isObject } from "@/utils/typeHelper"

function removeDisplayNames(targetComponentNode: ComponentNode) {
  const needDeleteDisplayNames: string[] = [targetComponentNode.displayName]
  targetComponentNode.childrenNode?.forEach((node) => {
    return needDeleteDisplayNames.push(...removeDisplayNames(node))
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
            dealNode.props ?? {},
            {},
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

export const addModalComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddModalComponentPayload>
> = (state, action) => {
  const { currentPageDisplayName, modalComponentNode } = action.payload
  if (!currentPageDisplayName || !modalComponentNode) {
    return state
  }
  const currentPageNode = searchDsl(state, currentPageDisplayName)
  if (currentPageNode == null || !Array.isArray(currentPageNode.childrenNode))
    return state
  const modalSectionNode = currentPageNode.childrenNode.find((child) => {
    return child.type === "MODAL_SECTION_NODE"
  }) as ModalSectionNode | undefined
  if (!modalSectionNode) {
    const newModalSectionNode = generateModalSectionConfig(
      currentPageDisplayName,
      "modalSection",
    )
    modalComponentNode.parentNode = newModalSectionNode.displayName
    newModalSectionNode.childrenNode = [modalComponentNode]
    currentPageNode.childrenNode.push(newModalSectionNode)
  } else {
    modalComponentNode.parentNode = modalSectionNode.displayName
    if (!Array.isArray(modalSectionNode.childrenNode)) {
      modalSectionNode.childrenNode = []
    }
    modalSectionNode.childrenNode.push(modalComponentNode)
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
  const tempTargetNode = searchDsl(rootNode, displayNames[0])
  if (!tempTargetNode) return
  const parentNodeDisplayName = tempTargetNode.parentNode
  const parentNode = searchDsl(rootNode, parentNodeDisplayName)
  if (!parentNode || !Array.isArray(parentNode.childrenNode)) return
  let needRemoveDisplayName: string[] = []
  const newChildrenNode = parentNode.childrenNode.filter((node) => {
    if (displayNames.includes(node.displayName)) {
      const removedDisplayNames = removeDisplayNames(node)
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
  const rootNode = state

  const searchNode = searchDsl(rootNode, displayName)
  if (!searchNode) return
  const parentNode = rootNode as RootComponentNode
  const childrenNodes = parentNode.childrenNode
  const currentIndex = childrenNodes.findIndex((value) => {
    return value.displayName === searchNode.displayName
  })
  if (currentIndex === -1) return
  const indexOfSortedKey = parentNode.props.pageSortedKey.findIndex(
    (key) => key === displayName,
  )
  if (indexOfSortedKey === -1) return
  const targetNode = childrenNodes[currentIndex]
  const needDeleteDisplayNames = removeDisplayNames(targetNode)
  DisplayNameGenerator.removeDisplayNameMulti(needDeleteDisplayNames)
  childrenNodes.splice(currentIndex, 1)
  parentNode.props.pageSortedKey.splice(indexOfSortedKey, 1)
}

export const sortComponentNodeChildrenReducer: CaseReducer<
  ComponentsState,
  PayloadAction<SortComponentNodeChildrenPayload>
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
  const node = searchDsl(state, displayName)
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
    const node = searchDsl(state, displayName)
    if (!node) return
    const widgetProps = node.props || {}
    const clonedWidgetProps = cloneDeep(widgetProps)
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
    const node = searchDsl(state, displayName)
    if (!node) return
    const widgetProps = node.props || {}
    const clonedWidgetProps = cloneDeep(widgetProps)
    Object.keys(propsSlice).forEach((path) => {
      const newValue = propsSlice[path]
      set(clonedWidgetProps, path, newValue)
    })
    node.props = clonedWidgetProps
  })
}

const changeDisplayName = (
  newDisplayName: string,
  displayName: string,
  state: ComponentsState,
) => {
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

export const updateComponentDisplayNameReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentDisplayNamePayload>
> = (state, action) => {
  const { displayName, newDisplayName } = action.payload
  DisplayNameGenerator.removeDisplayName(displayName)
  changeDisplayName(newDisplayName, displayName, state)
}

export const updateComponentContainerReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentContainerPayload>
> = (state, action) => {
  const { oldParentNodeDisplayName, newParentNodeDisplayName, updateSlices } =
    action.payload

  if (oldParentNodeDisplayName === newParentNodeDisplayName) {
    updateSlices.forEach((slice) => {
      const currentNode = searchDsl(state, slice.displayName)
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
    const currentNode = searchDsl(state, slice.displayName)
    if (!currentNode) return
    const olaParentNode = searchDsl(state, oldParentNodeDisplayName)
    if (!olaParentNode) return
    const currentIndex = olaParentNode.childrenNode.findIndex(
      (node) => node.displayName === currentNode.displayName,
    )
    if (currentIndex === -1) return
    olaParentNode.childrenNode.splice(currentIndex, 1)
    // add New
    const newParentNode = searchDsl(state, newParentNodeDisplayName)
    if (!newParentNode) return
    currentNode.parentNode = newParentNodeDisplayName
    currentNode.x = slice.x
    currentNode.y = slice.y
    currentNode.w = slice.w
    currentNode.h = slice.h
    if (!Array.isArray(newParentNode.childrenNode)) {
      newParentNode.childrenNode = [currentNode]
    } else {
      newParentNode.childrenNode.push(currentNode)
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

export const updateTargetPageLayoutReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateTargetPageLayoutPayload>
> = (state, action) => {
  if (!state) return state
  const { pageName, layout, originPageNode } = action.payload
  let targetPageNodeIndex = state.childrenNode.findIndex(
    (node) => node.displayName === pageName,
  )
  if (layout !== "Custom") {
    const config = layoutValueMapGenerateConfig[layout]

    if (targetPageNodeIndex === -1) return state
    const targetPageNode = state.childrenNode[targetPageNodeIndex]
    if (!targetPageNode) return state
    const needRemoveDisplayName = removeDisplayNames(targetPageNode)
    const pageConfig = config(targetPageNode.displayName)
    DisplayNameGenerator.removeDisplayNameMulti(needRemoveDisplayName)
    state.childrenNode.splice(
      targetPageNodeIndex,
      1,
      originPageNode ?? pageConfig,
    )
  } else {
    state.childrenNode.splice(targetPageNodeIndex, 1, originPageNode!)
  }
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
  if (!state?.childrenNode) return state
  const { pageName, deleteSectionName } = action.payload
  const targetPageIndex = state.childrenNode.findIndex(
    (node) => node.displayName === pageName,
  )
  if (targetPageIndex === -1) return state
  const targetPage = cloneDeep(state.childrenNode[targetPageIndex])

  targetPage.props = {
    ...targetPage.props,
    ...generationPageOptionsWhenDelete(deleteSectionName),
  }

  const targetPageChildrenNodeIndex = targetPage.childrenNode.findIndex(
    (node) => node.showName === deleteSectionName,
  )
  if (targetPageChildrenNodeIndex === -1) return state
  const targetPageChildeNode =
    targetPage.childrenNode[targetPageChildrenNodeIndex]
  const needDeleteDisplayNames = removeDisplayNames(targetPageChildeNode)
  DisplayNameGenerator.removeDisplayNameMulti(needDeleteDisplayNames)
  targetPage.childrenNode.splice(targetPageChildrenNodeIndex, 1)
  state.childrenNode.splice(targetPageIndex, 1, targetPage)
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
  if (!state?.childrenNode) return state
  const { pageName, addedSectionName, originSectionNode } = action.payload
  const targetPageIndex = state.childrenNode.findIndex(
    (node) => node.displayName === pageName,
  )
  if (targetPageIndex === -1) return state
  const targetPage = cloneDeep(state.childrenNode[targetPageIndex])

  targetPage.props = {
    ...targetPage.props,
    ...generationPageOptionsWhenAdd(addedSectionName),
  }

  if (originSectionNode) {
    const newOriginSectionNode = cloneDeep(originSectionNode)
    newOriginSectionNode.parentNode = targetPage.displayName
    targetPage.childrenNode.push(newOriginSectionNode)
  } else {
    let bodySectionSubPaths: string[] = []
    const bodySectionNode = targetPage.childrenNode.find(
      (node) => node.showName === "bodySection",
    )
    if (bodySectionNode) {
      bodySectionSubPaths =
        bodySectionNode.props?.sectionViewConfigs.map(
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
    targetPage.childrenNode.push(config)
  }
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
  PayloadAction<ComponentNode>
> = (state, action) => {
  const node = action.payload
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
}

export const addSectionViewHelper = (
  sectionViewNodeConfig: ComponentNode,
  sectionViewConfig: SectionViewShape,
  sectionNode: ComponentNode,
  originChildrenNode?: ComponentNode[],
) => {
  if (originChildrenNode && Array.isArray(originChildrenNode)) {
    let cloneDeepChildrenNode = JSON.parse(JSON.stringify(originChildrenNode))
    cloneDeepChildrenNode = cloneDeepChildrenNode.map(
      (node: ComponentNode) => ({
        ...node,
        parentNode: sectionViewNodeConfig.displayName,
      }),
    )
    sectionViewNodeConfig.childrenNode = cloneDeepChildrenNode
  }
  if (Array.isArray(sectionNode.childrenNode)) {
    sectionNode.childrenNode.push(sectionViewNodeConfig)
  } else {
    sectionNode.childrenNode = [sectionViewNodeConfig]
  }
  sectionNode.props!.viewSortedKey.push(sectionViewNodeConfig.displayName)
  sectionNode.props!.sectionViewConfigs.push(sectionViewConfig)
}

export const addSectionViewReducer: CaseReducer<
  ComponentsState,
  PayloadAction<AddSectionViewPayload>
> = (state, action) => {
  const { parentNodeName, sectionName, originChildrenNode } = action.payload

  const parentNode = searchDsl(state, parentNodeName)
  if (!parentNode || !parentNode.props) return
  let bodySectionSubPaths: string[] = []
  if (sectionName !== "bodySection") {
    const pageNode = searchDsl(state, parentNode.parentNode)
    if (!pageNode) return
    const bodySectionNode = pageNode.childrenNode.find(
      (node) => node.showName === "bodySection",
    )
    if (!bodySectionNode) return
    bodySectionSubPaths =
      bodySectionNode.props?.sectionViewConfigs.map(
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
  const parentNode = searchDsl(state, parentNodeName)
  if (!parentNode || !parentNode.props) return
  addSectionViewHelper(
    sectionViewNode,
    sectionViewConfig,
    parentNode,
    originChildrenNode,
  )
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
  const needDeleteDisplayNames = removeDisplayNames(targetNode)
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
  if (!state) return
  if (!state.props) state.props = {}
  state.props.viewportWidth = action.payload.viewportWidth
  state.props.viewportHeight = action.payload.viewportHeight
  state.props.viewportSizeType = action.payload.viewportSizeType
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
  let currentNode = searchDsl(state, displayName)
  if (!currentNode || !layoutInfo || Object.keys(layoutInfo).length === 0)
    return
  ;(Object.keys(layoutInfo) as Partial<Array<keyof LayoutInfo>>).forEach(
    (key) => {
      ;(currentNode as ComponentNode)[key as keyof LayoutInfo] = layoutInfo[
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
  const currentNode = searchDsl(state, displayName)
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
  if (!state) return
  const { value, key, oldKey } = action.payload
  const originGlobalData = state.props?.globalData || {}
  if (oldKey && originGlobalData[oldKey]) {
    delete originGlobalData[oldKey]
  }
  const newProps = {
    ...state.props,
    globalData: {
      ...originGlobalData,
      [key]: value,
    },
  }
  state.props = getNewWidgetPropsByUpdateSlice(
    newProps ?? {},
    state.props ?? {},
  )
}

export const deleteGlobalStateByKeyReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteGlobalStatePayload>
> = (state, action) => {
  if (!state || !state.props) return
  const { key } = action.payload
  const originGlobalData = state.props?.globalData || {}
  if (
    (Object.hasOwn && Object.hasOwn(originGlobalData, key)) ||
    Object.prototype.hasOwnProperty.call(originGlobalData, key)
  )
    delete originGlobalData[key]
}

export const getNeedChangeViewDisplayNames = (
  rootNode: ComponentNode,
  pageName: string,
  subPagePath: string,
) => {
  const pageNode = searchDsl(rootNode, pageName)
  if (!pageNode) return []
  const sectionNodes = pageNode.childrenNode.filter(
    (node) => node.type !== "MODAL_SECTION_NODE",
  )
  let needDeleteDisplayNames: string[] = []
  sectionNodes.forEach((sectionNode) => {
    const sectionViewConfigs = sectionNode.props?.sectionViewConfigs ?? []
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
  if (!state) return
  const needDeleteDisplayNames = getNeedChangeViewDisplayNames(
    state,
    pageName,
    subPagePath,
  )
  needDeleteDisplayNames.forEach((displayName) => {
    const targetComponentNode = searchDsl(state, displayName)
    if (!targetComponentNode) return
    const parentNode = searchDsl(state, targetComponentNode.parentNode)
    if (!parentNode) return
    parentNode.childrenNode = parentNode.childrenNode.filter(
      (node) => node.displayName !== displayName,
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
  const pageNode = searchDsl(state, pageName)
  if (!pageNode) return
  const sectionNodes = pageNode.childrenNode.filter(
    (node) => node.type !== "MODAL_SECTION_NODE",
  )
  sectionNodes.forEach((sectionNode) => {
    sectionNode.props?.sectionViewConfigs.forEach(
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
  const pageNode = searchDsl(state, pageName)
  if (!pageNode) return
  const sectionNodes = pageNode.childrenNode.filter(
    (node) => node.type !== "MODAL_SECTION_NODE",
  )
  sectionNodes.forEach((sectionNode) => {
    sectionNode.props!.defaultViewKey = subPagePath
  })
}

const addSubpageReducerHelper = (
  pageNode: ComponentNode,
  sectionName: string,
) => {
  const sectionNode = pageNode.childrenNode.find((node) => {
    return node.showName === sectionName
  })
  if (!sectionNode) {
    return
  }
  const config = generateSectionContainerConfig(
    sectionNode.displayName,
    `${sectionName}Container`,
  )
  const hasKeys = sectionNode.props!.sectionViewConfigs.map(
    (item: SectionViewShape) => {
      return `${sectionNode.displayName}-${item.path}`
    },
  )
  const newSectionViewConfig = generateNewViewItem(
    hasKeys,
    config.displayName,
    sectionNode.displayName,
  )
  if (Array.isArray(sectionNode.childrenNode)) {
    sectionNode.childrenNode.push(config)
  } else {
    sectionNode.childrenNode = [config]
  }
  sectionNode.props!.viewSortedKey.push(config.displayName)
  sectionNode.props!.sectionViewConfigs.push(newSectionViewConfig)
}

export const addSubPageReducer: CaseReducer<
  ComponentsState,
  PayloadAction<{ pageName: string }>
> = (state, action) => {
  if (!state) return
  const pageNode = searchDsl(state, action.payload.pageName)
  if (!pageNode) return
  addSubpageReducerHelper(pageNode, "bodySection")
}
