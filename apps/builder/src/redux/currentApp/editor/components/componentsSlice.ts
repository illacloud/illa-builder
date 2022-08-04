import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addComponentReducer,
  copyComponentNodeReducer,
  deleteComponentNodeReducer,
  resetComponentPropsReducer,
  updateComponentDisplayNameReducer,
  updateComponentDraggingState,
  updateComponentPropsReducer,
  updateComponentReducer,
  updateComponentResizeState,
  updateSingleComponentReducer,
} from "@/redux/currentApp/editor/components/componentsReducer"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    updateSingleComponentReducer,
    addComponentReducer,
    updateComponentReducer,
    updateComponentDraggingState,
    copyComponentNodeReducer,
    updateComponentPropsReducer,
    updateComponentResizeState,
    deleteComponentNodeReducer,
    resetComponentPropsReducer,
    updateComponentDisplayNameReducer,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
