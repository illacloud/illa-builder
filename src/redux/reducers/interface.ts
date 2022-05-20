import { EditorReduxState } from "./editorReducer"
import { ActionState } from "./actionReducer"

export interface BuilderState {
  editor: EditorReduxState
  action: ActionState
  userGroup: {}
  metaInfo: {}
}
