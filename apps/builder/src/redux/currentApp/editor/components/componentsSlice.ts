import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addComponentReducer,
  copyComponentNodeFromDisplayNamesReducer,
  copyComponentNodeReducer,
  deleteComponentNodeReducer,
  resetComponentPropsReducer,
  updateComponentDisplayNameReducer,
  updateComponentDraggingState,
  updateComponentPositionAndSizeReducer,
  updateComponentPropsReducer,
  updateComponentReducer,
  updateComponentReflow,
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
    copyComponentNodeFromDisplayNamesReducer,
    updateComponentPropsReducer,
    updateComponentResizeState,
    deleteComponentNodeReducer,
    resetComponentPropsReducer,
    updateComponentDisplayNameReducer,
    updateComponentPositionAndSizeReducer,
    updateComponentReflow,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
