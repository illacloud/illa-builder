import { AnyAction } from "@reduxjs/toolkit"
import { createMessage } from "@illa-design/react"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { reduxActionDependOnRestAPI } from "./antonymyRule"
import { CircularStack } from "./circularStack"

export const UNDO_REDO_STACK_MAX_LENGTH = 30

const message = createMessage()

export class ILLA_UNDO_REDO {
  undoStack: CircularStack<AnyAction>
  redoStack: CircularStack<AnyAction>

  constructor(maxStackLength: number = UNDO_REDO_STACK_MAX_LENGTH) {
    this.undoStack = new CircularStack<AnyAction>(maxStackLength)
    this.redoStack = new CircularStack<AnyAction>(maxStackLength)
  }

  pushToUndoStack(undoAction: AnyAction) {
    if (!this.redoStack.isEmpty() && !undoAction.from) {
      this.redoStack.clear()
    }
    this.undoStack.push(undoAction)
  }

  popFromUndoStack() {
    if (this.undoStack.isEmpty()) {
      message.warning({
        content: "frame.message.undo.nothing",
      })
    } else {
      const info = this.undoStack.pop() as AnyAction

      reduxActionDependOnRestAPI(info, REDUX_ACTION_FROM.UNDO)
    }
  }

  pushToRedoStack(redoAction: AnyAction) {
    this.redoStack.push(redoAction)
  }

  popFromRedoStack() {
    if (this.redoStack.isEmpty()) {
      message.warning({
        content: "frame.message.redo.nothing",
      })
    } else {
      const info = this.redoStack.pop() as AnyAction
      reduxActionDependOnRestAPI(info, REDUX_ACTION_FROM.REDO)
    }
  }
}

export default new ILLA_UNDO_REDO()
