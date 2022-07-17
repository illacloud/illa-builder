import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addComponentReducer,
  copyComponentNodeReducer,
  deleteComponentNodeReducer,
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
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
