import { demoReduxState } from "./editorReducer/demoReducer"
import { dragReduxState } from "./editorReducer/dragReducer"

export interface builderState {
  editor: {
    demo: demoReduxState
    drag: dragReduxState
  }
  action: {}
  userGroup: {}
  metaInfo: {}
}
