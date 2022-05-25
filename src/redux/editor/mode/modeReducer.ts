import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ModeState } from "@/redux/editor/mode/modeState"

export const setPreviewMode: CaseReducer<ModeState, PayloadAction<boolean>> = (
  state,
  action,
) => {
  return {
    ...state,
    isPreviewMode: action.payload,
  }
}
