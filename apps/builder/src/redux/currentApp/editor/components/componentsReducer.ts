import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ComponentNode,
  ComponentsState,
  DeleteComponentNodePayload,
  ResetComponentPropsPayload,
  UpdateComponentDisplayNamePayload,
  UpdateComponentPositionAndSizePayload,
  UpdateComponentPropsPayload,
} from "@/redux/currentApp/editor/components/componentsState"
import { cloneDeep } from "lodash"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { isObject } from "@/utils/typeHelper"
import {
  ComponentCopyDisplayNamesPayload,
  ComponentCopyPayload,
  ComponentDraggingPayload,
  ComponentDropPayload,
  ComponentResizePayload,
} from "@/redux/currentApp/editor/components/componentsPayload"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const updateComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentsState>
> = (state, action) => {
  return action.payload
}

export const updateComponentDraggingState: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentDraggingPayload>
> = (state, action) => {
  const node = searchDsl(state, action.payload.displayName)
  if (node != null) {
    node.isDragging = action.payload.isDragging
  }
}

export const updateComponentResizeState: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentResizePayload>
> = (state, action) => {
  const node = searchDsl(state, action.payload.displayName)
  if (node != null) {
    node.isResizing = action.payload.isResizing
  }
}

export const copyComponentNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentCopyPayload>
> = (state, action) => {
  action.payload.componentNodeList.forEach((node) => {
    const parentNode = searchDsl(state, node.parentNode)
    if (parentNode != null) {
      const newNode = {
        ...node,
        displayName: DisplayNameGenerator.generateDisplayName(
          node.type,
          node.showName,
        ),
        x: action.payload.offsetX + node.x,
        y: action.payload.offsetY + node.y,
      } as ComponentNode
      changeComponentNodeChildrenDisplayName(newNode)
      parentNode.childrenNode.push(newNode)
    }
  })
}

export const copyComponentNodeFromDisplayNamesReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentCopyDisplayNamesPayload>
> = (state, action) => {
  action.payload.displayNameList.forEach((name) => {
    const node = searchDsl(state, name)
    if (node != null) {
      const parentNode = searchDsl(state, node.parentNode)
      if (parentNode != null) {
        const newNode = {
          ...node,
          displayName: DisplayNameGenerator.generateDisplayName(
            node.type,
            node.showName,
          ),
          x: action.payload.offsetX + node.x,
          y: action.payload.offsetY + node.y,
        } as ComponentNode
        changeComponentNodeChildrenDisplayName(newNode)
        parentNode.childrenNode.push(newNode)
      }
    }
  })
}

function changeComponentNodeChildrenDisplayName(componentNode: ComponentNode) {
  if (
    componentNode.childrenNode != null &&
    componentNode.childrenNode.length > 0
  ) {
    componentNode.childrenNode.forEach((node) => {
      node = {
        ...node,
        displayName: DisplayNameGenerator.generateDisplayName(
          node.type,
          node.showName,
        ),
      } as ComponentNode
      if (node.childrenNode != null && node.childrenNode.length > 0) {
        changeComponentNodeChildrenDisplayName(node)
      }
    })
  }
}

export const addComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {
  const dealNode = action.payload
  if (state == null || dealNode.parentNode == null) {
    state = dealNode
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
      parentNode.childrenNode.push(dealNode)
    }
  }
}

export const updateSingleComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentDropPayload>
> = (state, action) => {
  const dealNode = action.payload.componentNode
  const parentNode = searchDsl(state, dealNode.parentNode)
  if (parentNode != null) {
    const index = parentNode.childrenNode.findIndex((value) => {
      return value.displayName === dealNode.displayName
    })
    if (index > -1) {
      parentNode.childrenNode[index] = dealNode
    }
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
  displayNames.forEach((value) => {
    const searchNode = searchDsl(rootNode, value)
    if (searchNode != null) {
      const parentNode = searchDsl(rootNode, searchNode.parentNode)
      if (parentNode == null) {
        return
      }
      const childrenNodes = parentNode.childrenNode
      if (childrenNodes == null) {
        return
      }
      childrenNodes.splice(
        childrenNodes.findIndex((value) => {
          return value.displayName === searchNode.displayName
        }),
        1,
      )
    }
  })
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

export const resetComponentPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ResetComponentPropsPayload>
> = (state, action) => {
  const { displayName, resetSlice } = action.payload
  if (!isObject(resetSlice) || !displayName) {
    return
  }
  const node = searchDsl(state, displayName)
  if (!node) return
  const widgetProps = resetSlice || {}
  const clonedWidgetProps = cloneDeep(widgetProps)
  node.props = getNewWidgetPropsByUpdateSlice(
    displayName,
    resetSlice,
    clonedWidgetProps,
  )
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
}

export const updateComponentPositionAndSizeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPositionAndSizePayload>
> = (state, action) => {
  const { parentDisplayName, displayName, x, y, w, h } = action.payload
  const parentNode = searchDsl(state, parentDisplayName)
  if (parentNode != null) {
    const index = parentNode.childrenNode.findIndex((value) => {
      return value.displayName === displayName
    })
    if (index > -1) {
      const node = parentNode.childrenNode[index]
      node.x = x
      node.y = y
      node.w = w
      node.h = h
    }
  }
}

export const updateComponentReflow: CaseReducer<
  ComponentsState,
  PayloadAction<{ parentDisplayName: string; childNodes: ComponentNode[] }>
> = (state, action) => {
  const { parentDisplayName, childNodes } = action.payload
  const targetNode = searchDsl(state, parentDisplayName)
  if (targetNode) {
    const childNodesDisplayNamesMap = new Map()
    childNodes.forEach((node) => {
      childNodesDisplayNamesMap.set(node.displayName, node)
    })
    targetNode.childrenNode = targetNode.childrenNode?.map((node) => {
      if (childNodesDisplayNamesMap.has(node.displayName)) {
        return childNodesDisplayNamesMap.get(node.displayName)
      }
      return node
    })
  }
}
