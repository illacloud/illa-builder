import { createSlice } from "@reduxjs/toolkit"
import { BuilderInfoInitialState } from "@/redux/builderInfo/builderState"
import { updateLanguageReducer } from "@/redux/builderInfo/builderReducer"

const builderInfoSlice = createSlice({
  name: "builderInfo",
  initialState: BuilderInfoInitialState,
  reducers: {
    updateLanguageReducer,
  },
})

export const builderInfoActions = builderInfoSlice.actions
export default builderInfoSlice.reducer
