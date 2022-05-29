import { createSlice } from "@reduxjs/toolkit"
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice"
import { AppInfo } from "@/redux/currentApp/appInfo/appInfoState"
import { updateAppInfoReducer } from "@/redux/currentApp/appInfo/appInfoReducer"

const appInfoSlice = createSlice<
  AppInfo | undefined,
  SliceCaseReducers<AppInfo | undefined>,
  "appInfo"
>({
  name: "appInfo",
  initialState: undefined,
  reducers: { updateAppInfoReducer },
})

export const appInfoActions = appInfoSlice.actions
export default appInfoSlice.reducer
