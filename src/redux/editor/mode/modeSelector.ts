import { RootState } from "@/store"

export const getPreviewMode = (state: RootState) =>
  state.editor.mode.isPreviewMode
