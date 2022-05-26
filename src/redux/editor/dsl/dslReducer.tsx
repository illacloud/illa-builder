import { DslState } from "@/redux/editor/dsl/dslState"
import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

export const DslActionName = {
  AddFrame: "AddFrame",
  AddItem: "AddItem",
  UpdateItem: "UpdateItem",
  updateDslProps: "UpdateDslProps",
}
export type DslAction = keyof typeof DslActionName

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

// 测试用。
export const updateDslProps: CaseReducer<
  DslState,
  PayloadAction<{
    targetId: string
    newState: any
  }>
> = (dslState, action) => {
  console.log("准备更新")
  const { targetId, newState } = action.payload
  const current = dslState.root
  const queue = new Array<DSLWidget>()
  queue.push(current)
  while (queue.length) {
    const head = queue[queue.length - 1]

    if (head.id === targetId) {
      console.log("找到属性")
      head.props = {
        ...head.props,
        ...newState,
      }
      return
    }
    queue.pop()
    if (head.children && head.children.length) {
      queue.push(...head.children)
    }
  }
}

export const dslActionHandler: CaseReducer<
  DslState,
  PayloadAction<{
    type: DslAction
    dslFrame: DSLWidget
  }>
> = (state, action) => {
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
        addItemAction.dslFrame.parentId,
        safeState.root!!,
        addItemAction.dslFrame,
      )
      break
    }
    case DslActionName.UpdateItem: {
      const updateTextAction = action.payload
      updateNode(safeState, safeState.root!!, updateTextAction.dslFrame)
      break
    }
  }
  return safeState
}
