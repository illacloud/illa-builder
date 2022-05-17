import { createSlice } from "@reduxjs/toolkit"
import { DslState } from "./interface"
import { DslActionName } from "./dsl-action"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants/dragConfig"
import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"

const initialState = {
  root: {
    id: MAIN_CONTAINER_ID,
    parentId: MAIN_CONTAINER_ID,
    children: [],
    type: "CANVAS_WIDGET",
    widgetName: "Canvas",
    props: {
      version: "0.0.1",
      height: "100%",
      width: "100%",
      leftColumn: "auto",
      rightColumn: "auto",
      topRow: "auto",
      bottomRow: "auto",
      position: "absolute",
      dragDisabled: true,
    },
  },
} as DslState

function addNode(
  currentState: DslState,
  parentId: string,
  dslNode: DSLWidget,
): DslState {
  // 只有 layout 才可以没有parent
  if (parentId == MAIN_CONTAINER_ID) {
    if (dslNode.widgetName == "Canvas") {
      return {
        ...currentState,
        root: dslNode as DSLWidget,
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
  dslLayout: DSLWidget,
  dslNode: DSLWidget,
) {
  if (dslLayout.id == parentId) {
    if (
      !dslLayout?.children?.some((value) => {
        return dslNode.id == value.id
      })
    ) {
      dslLayout?.children?.push(dslNode)
    }
    return dslLayout
  } else {
    dslLayout?.children?.forEach((value) => {
      if (value.widgetName == "Canvas") {
        addNode2Layout(parentId, value, dslNode)
      }
    })
  }
}

function updateNode(
  dslState: DslState,
  parentNode: DSLWidget,
  dslNode: DSLWidget,
) {
  if (dslNode.parentId == MAIN_CONTAINER_ID && dslNode.widgetName == "Canvas") {
    dslState.root = dslNode as DSLWidget
    return
  }
  if (parentNode.id == dslNode.parentId && parentNode.children) {
    const index = parentNode.children.findIndex((value, index, obj) => {
      return value.id == dslNode.id
    })
    parentNode.children[index] = dslNode
  } else {
    parentNode.children?.forEach((value) => {
      if (value.widgetName == "Canvas") {
        updateNode(dslState, value, dslNode)
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
          const addFrameAction = action.payload
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
        case DslActionName.AddItem: {
          const addItemAction = action.payload
          addNode2Layout(
            addItemAction.dslText.parentId,
            safeState.root!!,
            addItemAction.dslText,
          )
          break
        }
        case DslActionName.UpdateItem: {
          const updateTextAction = action.payload
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
