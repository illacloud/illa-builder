import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addComponentReducer,
  deleteComponentNodeReducer,
  resetComponentPropsReducer,
  updateComponentDisplayNameReducer,
  updateComponentPropsReducer,
  updateComponentReducer,
  updateComponentReflow,
  updateComponentsShape,
} from "@/redux/currentApp/editor/components/componentsReducer"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    updateComponentsShape,
    addComponentReducer,
    updateComponentReducer,
    updateComponentPropsReducer,
    deleteComponentNodeReducer,
    resetComponentPropsReducer,
    updateComponentDisplayNameReducer,
    updateComponentReflow,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
