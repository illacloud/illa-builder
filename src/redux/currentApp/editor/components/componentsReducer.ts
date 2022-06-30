import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import {
  ComponentNode,
  ComponentsState,
  deleteComponentNodePayload,
  updateComponentPropsPayload,
} from "@/redux/currentApp/editor/components/componentsState"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { isObject } from "@/utils/typeHelper"

export const removeComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {
  const removeNode = action.payload
  if (state.rootDsl == null || removeNode.parentNode == null) {
    return
  } else {
    const parentNode = searchDsl(state.rootDsl, removeNode.parentNode)
    if (parentNode != null) {
      const children = parentNode.childrenNode
      if (children != null) {
        delete children[removeNode.displayName]
      }
    }
  }
}

export const copyComponentNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {}

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
      if (parentNode.childrenNode == null) {
        parentNode.childrenNode = {}
      }
      parentNode.childrenNode[dealNode.displayName] = dealNode
    }
  }
}

export const deleteComponentNodeReducer: CaseReducer<
  ComponentsState,
  PayloadAction<deleteComponentNodePayload>
> = (state, action) => {
  const { displayName, parentDisplayName } = action.payload
  if (state.rootDsl == null) {
    return
  }
  const rootNode = state.rootDsl
  const parentNode = searchDsl(rootNode, parentDisplayName)
  if (parentNode == null) {
    return
  }
  const childrenNodes = parentNode.childrenNode
  if (childrenNodes == null) {
    return
  }
  delete childrenNodes[displayName]
}

export const updateComponentPropsReducer: CaseReducer<
  ComponentsState,
  PayloadAction<updateComponentPropsPayload>
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
