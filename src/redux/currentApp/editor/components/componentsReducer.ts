import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import {
  ComponentNode,
  ComponentsState,
  DeleteComponentNodePayload,
  UpdateComponentPropsPayload,
} from "@/redux/currentApp/editor/components/componentsState"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { isObject } from "@/utils/typeHelper"
import {
  ComponentCopyPayload,
  ComponentDraggingPayload,
  ComponentResizePayload,
} from "@/redux/currentApp/editor/components/componentsPayload"

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
  const node = searchDsl(state.rootDsl, action.payload.displayName)
  if (node != null) {
    node.isDragging = action.payload.isDragging
  }
}

export const updateComponentResizeState: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentResizePayload>
> = (state, action) => {
  const node = searchDsl(state.rootDsl, action.payload.displayName)
  if (node != null) {
    node.isResizing = action.payload.isResizing
  }
}

export const copyComponentNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentCopyPayload>
> = (state, action) => {
  const parentNode = searchDsl(
    state.rootDsl,
    action.payload.componentNode.parentNode,
  )
  if (parentNode != null) {
    parentNode.childrenNode.push({
      ...action.payload.componentNode,
      displayName: action.payload.newDisplayName,
      y: action.payload.componentNode.y + action.payload.componentNode.h,
    })
  }
}

export const addOrUpdateComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {
  const dealNode = action.payload
  if (state.rootDsl == null || dealNode.parentNode == null) {
    state.rootDsl = dealNode
  } else {
    const parentNode = searchDsl(state.rootDsl, dealNode.parentNode)
    if (parentNode != null) {
      if (
        parentNode.childrenNode.find((value) => {
          return value.displayName === dealNode.displayName
        })
      ) {
        parentNode.childrenNode.splice(
          parentNode.childrenNode.findIndex((value, index, obj) => {
            return value.displayName === dealNode.displayName
          }),
          1,
        )
      }
      parentNode.childrenNode.push(dealNode)
    }
  }
}

export const deleteComponentNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<DeleteComponentNodePayload>
> = (state, action) => {
  const { displayName } = action.payload
  if (state.rootDsl == null) {
    return
  }
  const rootNode = state.rootDsl
  displayName.forEach((value, index) => {
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
        childrenNodes.findIndex((value, index, obj) => {
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
  const node = searchDsl(state.rootDsl, displayName)
  if (!node) return
  const widgetProps = node.props || {}
  const clonedWidgetProps = cloneDeep(widgetProps)
  node.props = getNewWidgetPropsByUpdateSlice(
    displayName,
    updateSlice,
    clonedWidgetProps,
  )
}
