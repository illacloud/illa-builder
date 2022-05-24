import { EditorState } from "@/redux/action/editor/editorReducer"

export interface ActionState {
  editor: EditorState
  queryList: QueryListState
}
