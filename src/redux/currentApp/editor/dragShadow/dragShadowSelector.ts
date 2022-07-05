import { RootState } from "@/store"

export const getDragShadowMap = (state: RootState) => {
  return state.currentApp.editor.dragShadow
}
