import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addComponentReducer,
  copyComponentReducer,
  deleteComponentNodeReducer,
  resetComponentPropsReducer,
  sortComponentNodeChildrenReducer,
  updateComponentContainerReducer,
  updateComponentDisplayNameReducer,
  updateComponentPropsReducer,
  updateComponentReducer,
  updateComponentReflowReducer,
  updateComponentsShape,
  updateMultiComponentPropsReducer,
} from "@/redux/currentApp/editor/components/componentsReducer"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    updateComponentsShape,
    addComponentReducer,
    copyComponentReducer,
    updateComponentReducer,
    updateComponentPropsReducer,
    deleteComponentNodeReducer,
    resetComponentPropsReducer,
    sortComponentNodeChildrenReducer,
    updateComponentDisplayNameReducer,
    updateComponentReflowReducer,
    updateComponentContainerReducer,
    updateMultiComponentPropsReducer,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
