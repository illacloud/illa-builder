import { BuilderState } from "@/redux/reducers/interface"

export const getEditorDsl = (state: BuilderState) => state.editor.present.dsl
