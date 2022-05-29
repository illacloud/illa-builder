import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { AppInfo } from "./appInfoState"

export const updateAppInfoReducer: CaseReducer<
  AppInfo | undefined,
  PayloadAction<AppInfo | undefined>
> = (state, action) => {
  state = action.payload
  return state
}
