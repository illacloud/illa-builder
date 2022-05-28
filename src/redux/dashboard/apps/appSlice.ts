import { createSlice } from "@reduxjs/toolkit"
import { AppsInitialState } from "@/redux/dashboard/apps/appState"
import {
  addAppReducer,
  removeAppReducer,
  renameAppReducer,
  updateAppListReducer,
} from "@/redux/dashboard/apps/appReducer"

const appSlice = createSlice({
  name: "apps",
  initialState: AppsInitialState,
  reducers: {
    updateAppListReducer,
    addAppReducer,
    removeAppReducer,
    renameAppReducer,
  },
})

export default appSlice
