import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addOrUpdateComponentReducer,
  bringToFrontReducer,
  copyComponentNodeReducer,
  deleteComponentNodeReducer,
  removeComponentReducer,
  updateComponentPropsReducer,
  updateComponentReducer,
} from "@/redux/currentApp/editor/components/componentsReducer"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    removeComponentReducer,
    addOrUpdateComponentReducer,
    updateComponentReducer,
    copyComponentNodeReducer,
    bringToFrontReducer,
    updateComponentPropsReducer,
    deleteComponentNodeReducer,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
