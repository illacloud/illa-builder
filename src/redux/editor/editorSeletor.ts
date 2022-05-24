import { BuilderState } from "@/redux/reducers/interface"

export const getActionEditorQueryId = (state: BuilderState) =>
  state.action.editor.queryId
