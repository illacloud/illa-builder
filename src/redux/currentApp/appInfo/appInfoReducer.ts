import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { AppInfo } from "./appInfoState"

export const updateAppInfoReducer: CaseReducer<
  AppInfo | null,
  PayloadAction<AppInfo | null>
> = (state, action) => {
  state = action.payload
  return state
}
