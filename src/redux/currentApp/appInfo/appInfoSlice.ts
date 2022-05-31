import { createSlice } from "@reduxjs/toolkit"
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice"
import { AppInfo } from "@/redux/currentApp/appInfo/appInfoState"
import { updateAppInfoReducer } from "@/redux/currentApp/appInfo/appInfoReducer"

const appInfoSlice = createSlice<
  AppInfo | null,
  SliceCaseReducers<AppInfo | null>,
  "appInfo"
>({
  name: "appInfo",
  initialState: null,
  reducers: { updateAppInfoReducer },
})

export const appInfoActions = appInfoSlice.actions
export default appInfoSlice.reducer
