import { createSlice } from "@reduxjs/toolkit"
import { updateLanguageReducer } from "@/redux/builderInfo/builderInfoReducer"
import { BuilderInfoInitialState } from "@/redux/builderInfo/builderInfoState"

const builderInfoSlice = createSlice({
  name: "builderInfo",
  initialState: BuilderInfoInitialState,
  reducers: {
    updateLanguageReducer,
  },
})

export const builderInfoActions = builderInfoSlice.actions
export default builderInfoSlice.reducer
