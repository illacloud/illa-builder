import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ComponentNode,
  ComponentsState,
} from "@/redux/currentApp/editor/components/componentsState"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"

export const addComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {
  const addNode = action.payload
  if (state.rootDsl == null || addNode.parentNode == null) {
    state.rootDsl = addNode
  } else {
    const parentNode = searchDsl(state.rootDsl, addNode.parentNode)
    if (parentNode != null) {
      parentNode.childrenNode?.push(addNode)
    }
  }
}

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
      const index = parentNode.childrenNode?.indexOf(removeNode)
      if (index !== undefined) {
        parentNode.childrenNode?.splice(index, 1)
      }
    }
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
      if (parentNode.childrenNode == null) {
        parentNode.childrenNode = []
      }
      const index = parentNode.childrenNode.indexOf(dealNode)
      if (index !== -1) {
        parentNode.childrenNode[index] = dealNode
      } else {
        parentNode.childrenNode.push(dealNode)
      }
    }
  }
}

export const updateDropComponent: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {
  const dealNode = action.payload
  if (state.rootDsl == null || dealNode.parentNode == null) {
    return
  }
  const parentNode = searchDsl(state.rootDsl, dealNode.parentNode)
  if (parentNode != null && parentNode.childrenNode != null) {
    const index = parentNode.childrenNode.indexOf(dealNode)
    if (index != -1) {
      parentNode.childrenNode[index].containerType = "EDITOR_SCALE_SQUARE"
    }
  }
}
