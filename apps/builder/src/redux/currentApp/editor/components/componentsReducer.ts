import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ComponentNode,
  ComponentsState,
  DeleteComponentNodePayload,
  ResetComponentPropsPayload,
  UpdateComponentDisplayNamePayload,
  UpdateComponentPropsPayload,
  UpdateComponentReflowPayload,
} from "@/redux/currentApp/editor/components/componentsState"
import { cloneDeep } from "lodash"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { isObject } from "@/utils/typeHelper"
import { UpdateComponentsShapePayload } from "@/redux/currentApp/editor/components/componentsPayload"

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
export const updateComponentReflowReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentReflowPayload>
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
