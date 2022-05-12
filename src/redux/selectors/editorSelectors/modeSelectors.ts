import { BuilderState } from "@/redux/reducers/interface"

export const getPreviewMode = (state: BuilderState) =>
  state.editor.present.mode.isPreviewMode
