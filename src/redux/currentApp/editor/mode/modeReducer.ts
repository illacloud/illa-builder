import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ModeState } from "@/redux/currentApp/editor/mode/modeState"

export const setPreviewMode: CaseReducer<ModeState, PayloadAction<boolean>> = (
  state,
  action,
) => {
  state.isPreviewMode = action.payload
}
