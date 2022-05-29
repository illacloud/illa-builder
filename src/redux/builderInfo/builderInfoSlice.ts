import { createSlice } from "@reduxjs/toolkit"
import { BuilderInfoInitialState } from "@/redux/builderInfo/builderInfoState"
import {
  updateConnectErrorReducer,
  updateConnectLoadingReducer,
  updateLanguageReducer,
} from "@/redux/builderInfo/builderInfoReducer"

const builderInfoSlice = createSlice({
  name: "builderInfo",
  initialState: BuilderInfoInitialState,
  reducers: {
    updateLanguageReducer,
    updateConnectLoadingReducer,
    updateConnectErrorReducer,
  },
})

export const builderInfoActions = builderInfoSlice.actions
export default builderInfoSlice.reducer
