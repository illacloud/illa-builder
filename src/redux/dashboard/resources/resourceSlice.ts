import { createSlice } from "@reduxjs/toolkit"
import { ResourcesInitialState } from "@/redux/dashboard/resources/resourceState"
import {
  addResourceReducer,
  removeResourceReducer,
  updateResourceListReducer,
  updateResourceReducer,
} from "@/redux/dashboard/resources/resourceReducer"

const resourceSlice = createSlice({
  name: "resources",
  initialState: ResourcesInitialState,
  reducers: {
    updateResourceListReducer,
    addResourceReducer,
    removeResourceReducer,
    updateResourceReducer,
  },
})

export default resourceSlice
