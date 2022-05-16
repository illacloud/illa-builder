import { createSlice } from "@reduxjs/toolkit"
import { DslLayout, DslNode, DslState } from "./interface"
import { AddFrame, AddText, DslActionName, UpdateText } from "./dsl-action"
import {
  MAIN_CONTAINER_ID,
  Category,
  DslType,
} from "@/page/Editor/constants/dragConfig"

const initialState = {
  root: {
    id: "dslRoot",
    parentId: MAIN_CONTAINER_ID,
    version: "0.0.1",
    nodeChildren: [],
    type: DslType.DslFrame,
    category: Category.Layout,
    props: {
      height: "auto",
      width: "auto",
      leftColumn: "auto",
      rightColumn: "auto",
      topRow: "auto",
      bottomRow: "auto",
      position: "absolute",
    },
  },
} as DslState

function addNode(
  currentState: DslState,
  parentId: string,
  dslNode: DslNode,
): DslState {
  // 只有 layout 才可以没有parent
  if (parentId == MAIN_CONTAINER_ID) {
    if (dslNode.category == Category.Layout) {
      return {
        ...currentState,
        root: dslNode as DslLayout,
      }
    } else {
      return currentState
    }
  } else {
    addNode2Layout(parentId, currentState.root!!, dslNode)
    return currentState
  }
}

function addNode2Layout(
  parentId: string,
  dslLayout: DslLayout,
  dslNode: DslNode,
) {
  if (dslLayout.id == parentId) {
    if (
      !dslLayout.nodeChildren.some((value) => {
        return dslNode.id == value.id
      })
    ) {
      dslLayout.nodeChildren.push(dslNode)
    }
    return dslLayout
  } else {
    dslLayout.nodeChildren.forEach((value) => {
      if (value.category == Category.Layout) {
        addNode2Layout(parentId, value as DslLayout, dslNode)
      }
    })
  }
}

function updateNode(
  dslState: DslState,
  parentNode: DslLayout,
  dslNode: DslNode,
) {
  if (
    dslNode.parentId == MAIN_CONTAINER_ID &&
    dslNode.category == Category.Layout
  ) {
    dslState.root = dslNode as DslLayout
    return
  }
  if (parentNode.id == dslNode.parentId) {
    const index = parentNode.nodeChildren.findIndex((value, index, obj) => {
      return value.id == dslNode.id
    })
    parentNode.nodeChildren[index] = dslNode
  } else {
    parentNode.nodeChildren.forEach((value) => {
      if (value.category == Category.Layout) {
        updateNode(dslState, value as DslLayout, dslNode)
      }
    })
  }
}

const dslSlice = createSlice({
  name: "dsl",
  initialState,
  reducers: {
    dslActionHandler(state, action) {
      let safeState = state

      switch (action.payload?.type) {
        case DslActionName.AddFrame: {
          const addFrameAction = action.payload as AddFrame
          if (addFrameAction.dslFrame.parentId == null) {
            safeState = {
              ...safeState,
              root: addFrameAction.dslFrame,
            }
          } else {
            safeState = addNode(
              safeState,
              addFrameAction.dslFrame.parentId,
              addFrameAction.dslFrame,
            )
          }
          break
        }
        case DslActionName.AddText: {
          const addTextAction = action.payload as AddText
          addNode2Layout(
            addTextAction.dslText.parentId,
            safeState.root!!,
            addTextAction.dslText,
          )
          break
        }
        case DslActionName.UpdateText: {
          const updateTextAction = action.payload as UpdateText
          updateNode(safeState, safeState.root!!, updateTextAction.newDslText)
          break
        }
      }
      return safeState
    },
  },
})

export * from "./interface"
export const { dslActionHandler } = dslSlice.actions
export const dslActions = dslSlice.actions
export default dslSlice.reducer
