import { RootState } from "@/store"

export const getPanelConfig = (state: RootState) =>
  state.editor.panelConfig
