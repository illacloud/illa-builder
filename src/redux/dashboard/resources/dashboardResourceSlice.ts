import { CaseReducer, createSlice } from "@reduxjs/toolkit"
import {
  ResourcesInitialState,
  ResourcesState,
} from "@/redux/dashboard/resources/dashboardResourceState"
import {
  addDashboardResourceReducer,
  removeDashboardResourceReducer,
  updateDashboardResourceListReducer,
  updateDashboardResourceReducer,
} from "@/redux/dashboard/resources/dashboardResourceReducer"
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice"

const dashboardResourceSlice = createSlice<
  ResourcesState,
  SliceCaseReducers<ResourcesState>,
  "resources"
>({
  name: "resources",
  initialState: ResourcesInitialState,
  reducers: {
    updateResourceListReducer: updateDashboardResourceListReducer,
    addResourceReducer: addDashboardResourceReducer,
    removeResourceReducer: removeDashboardResourceReducer,
    updateResourceReducer: updateDashboardResourceReducer,
  },
})

export const dashboardResourceActions = dashboardResourceSlice.actions
export default dashboardResourceSlice.reducer
