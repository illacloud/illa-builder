import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addOrUpdateComponentReducer,
  deleteComponentNodeReducer,
  removeComponentReducer,
  updateComponentDynamicStringsReducer,
  updateComponentPropsReducer,
} from "@/redux/currentApp/editor/components/componentsReducer"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    removeComponentReducer,
    addOrUpdateComponentReducer,
    updateComponentPropsReducer,
    updateComponentDynamicStringsReducer,
    deleteComponentNodeReducer,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
