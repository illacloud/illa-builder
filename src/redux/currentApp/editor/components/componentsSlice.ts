import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addOrUpdateComponentReducer,
  copyComponentNodeReducer,
  deleteComponentNodeReducer,
  updateComponentPropsReducer,
  updateComponentReducer,
} from "@/redux/currentApp/editor/components/componentsReducer"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    addOrUpdateComponentReducer,
    updateComponentReducer,
    copyComponentNodeReducer,
    updateComponentPropsReducer,
    deleteComponentNodeReducer,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
