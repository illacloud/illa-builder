import { RootState } from "@/store"

export const getEditorDsl = (state: RootState) => state.currentApp.editor.dsl
