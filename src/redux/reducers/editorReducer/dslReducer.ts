import { createSlice, AnyAction } from "@reduxjs/toolkit"
import {
  DslLayout,
  DslNode,
  DslState,
} from "../../../page/Editor/store/states/dsl-state"
import {
  AddFrame,
  AddText,
  DslActionName,
  UpdateText,
} from "../../../page/Editor/store/dsl-action"
import { Category, DslType } from "../../../page/Editor/dragConfig/dragType"

const initialState = {
  root: {
    dslKey: "dslRoot",
    parentKey: "root",
    version: "0.0.1",
    nodeChildren: [],
    type: DslType.DslFrame,
    category: Category.Layout,
    height: "auto",
    width: "auto",
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
    position: "absolute",
  },
} as DslState

function addNode(
  currentState: DslState,
  parentKey: string,
  dslNode: DslNode,
): DslState {
  // 只有 layout 才可以没有parent
  if (parentKey == "root") {
    if (dslNode.category == Category.Layout) {
      return {
        ...currentState,
        root: dslNode as DslLayout,
      }
    } else {
      return currentState
    }
  } else {
    addNode2Layout(parentKey, currentState.root!!, dslNode)
    return currentState
  }
}

function addNode2Layout(
  parentKey: string,
  dslLayout: DslLayout,
  dslNode: DslNode,
) {
  if (dslLayout.dslKey == parentKey) {
    if (
      !dslLayout.nodeChildren.some((value) => {
        return dslNode.dslKey == value.dslKey
      })
    ) {
      dslLayout.nodeChildren.push(dslNode)
    }
    return dslLayout
  } else {
    dslLayout.nodeChildren.forEach((value) => {
      if (value.category == Category.Layout) {
        addNode2Layout(parentKey, value as DslLayout, dslNode)
      }
    })
  }
}

function updateNode(
  dslState: DslState,
  parentNode: DslLayout,
  dslNode: DslNode,
) {
  if (dslNode.parentKey == "root" && dslNode.category == Category.Layout) {
    dslState.root = dslNode as DslLayout
    return
  }
  if (parentNode.dslKey == dslNode.parentKey) {
    const index = parentNode.nodeChildren.findIndex((value, index, obj) => {
      return value.dslKey == dslNode.dslKey
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
  name: "dslState",
  initialState,
  reducers: {
    dslActionHandler(dslState, action) {
      let safeState = dslState

      switch (action.payload?.type) {
        case DslActionName.AddFrame: {
          const addFrameAction = action.payload as AddFrame
          if (addFrameAction.dslFrame.parentKey == null) {
            safeState = {
              ...safeState,
              root: addFrameAction.dslFrame,
            }
          } else {
            safeState = addNode(
              safeState,
              addFrameAction.dslFrame.parentKey,
              addFrameAction.dslFrame,
            )
          }
          break
        }
        case DslActionName.AddText: {
          const addTextAction = action.payload as AddText
          addNode2Layout(
            addTextAction.dslText.parentKey,
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

export const { dslActionHandler } = dslSlice.actions
export const dslActions = dslSlice.actions
export default dslSlice.reducer
