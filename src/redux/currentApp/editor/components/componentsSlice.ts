import { createSlice } from "@reduxjs/toolkit"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"
import {
  addComponentReducer,
  addOrUpdateComponentReducer,
  removeComponentReducer,
  updateComponentPropsReducer,
} from "@/redux/currentApp/editor/components/componentsReducer"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    addComponentReducer,
    removeComponentReducer,
    addOrUpdateComponentReducer,
    updateComponentPropsReducer,
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
