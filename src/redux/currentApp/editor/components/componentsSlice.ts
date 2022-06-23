import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addOrUpdateComponentReducer,
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
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
