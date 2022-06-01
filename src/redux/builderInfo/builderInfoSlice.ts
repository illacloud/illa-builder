import { createSlice } from "@reduxjs/toolkit"
import { BuilderInfoInitialState } from "@/redux/builderInfo/builderInfoState"
import { updateLanguageReducer } from "@/redux/builderInfo/builderInfoReducer"

const builderInfoSlice = createSlice({
  name: "builderInfo",
  initialState: BuilderInfoInitialState,
  reducers: {
    updateLanguageReducer,
  },
})

export const builderInfoActions = builderInfoSlice.actions
export default builderInfoSlice.reducer
