import { AnyAction } from "@reduxjs/toolkit"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { illaSnapshot } from "@/page/App/components/DotPanel/constant/snapshotNew"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import store from "@/store"
import { reduxActionDependOnRestAPI } from "./antonymyRule"
import { CircularStack } from "./circularStack"

export const UNDO_REDO_STACK_MAX_LENGTH = 30

const message = createMessage()

export class ILLA_UNDO_REDO {
  undoStack: CircularStack<AnyAction[]>
  redoStack: CircularStack<AnyAction[]>

  constructor(maxStackLength: number = UNDO_REDO_STACK_MAX_LENGTH) {
    this.undoStack = new CircularStack<AnyAction[]>(maxStackLength)
    this.redoStack = new CircularStack<AnyAction[]>(maxStackLength)
  }

  pushToUndoStack(undoAction: AnyAction[]) {
    if (!this.redoStack.isEmpty() && !undoAction[0].from) {
      this.redoStack.clear()
    }
    this.undoStack.push(undoAction)
  }

  popFromUndoStack() {
    const rootState = store.getState()
    const snapShot = getClientWidgetLayoutInfo(rootState)
    illaSnapshot.setSnapshot(snapShot)
    if (this.undoStack.isEmpty()) {
      message.warning({
        content: i18n.t("frame.message.undo.nothing"),
      })
    } else {
      const info = this.undoStack.pop() as AnyAction[]
      reduxActionDependOnRestAPI(info, REDUX_ACTION_FROM.UNDO)
    }
  }

  modifyUndoStackAtLast(undoAction: AnyAction[], isRedo: boolean = false) {
    if (this.undoStack.isEmpty()) {
      return
    }
    const lastUndoAction = this.undoStack.pop() as AnyAction[]
    if (isRedo) {
      this.undoStack.push([...lastUndoAction, ...undoAction])
    } else {
      this.undoStack.push([...undoAction, ...lastUndoAction])
    }
  }

  pushToRedoStack(redoAction: AnyAction[]) {
    this.redoStack.push(redoAction)
  }

  popFromRedoStack() {
    const rootState = store.getState()
    const snapShot = getClientWidgetLayoutInfo(rootState)
    illaSnapshot.setSnapshot(snapShot)
    if (this.redoStack.isEmpty()) {
      message.warning({
        content: i18n.t("frame.message.redo.nothing"),
      })
    } else {
      const info = this.redoStack.pop() as AnyAction[]
      reduxActionDependOnRestAPI(info, REDUX_ACTION_FROM.REDO)
    }
  }
  destroy() {
    this.undoStack.clear()
    this.redoStack.clear()
  }
}

export default new ILLA_UNDO_REDO()
