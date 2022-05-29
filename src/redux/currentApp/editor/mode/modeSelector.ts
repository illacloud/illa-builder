import { RootState } from "@/store"

export const getPreviewMode = (state: RootState) =>
  state.currentApp.editor.mode.isPreviewMode
