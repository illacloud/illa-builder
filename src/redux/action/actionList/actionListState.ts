import { EditorState } from "@/redux/action/editor/editorReducer"

export interface ResourceConfig {
  id: string
}

export interface ActionItem {
  id: string
  name: string
  type: "query" | "transformer"
  isWarning?: boolean
  isUpdated?: boolean
  time?: string
  resourceConfig?: ResourceConfig
}

export interface ActionState {
  editor: EditorState
  queryList: QueryListState
}

export const actionInitialItem = {} as ActionItem
