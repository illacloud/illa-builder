import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  DashboardResource,
  ResourcesState,
} from "@/redux/dashboard/resources/dashboardResourceState"
import {
  AddDashboardResourcePayload,
  UpdateDashboardResourcePayload,
} from "@/redux/dashboard/resources/dashboardResourcePayload"

export const updateDashboardResourceListReducer: CaseReducer<
  ResourcesState,
  PayloadAction<DashboardResource[]>
> = (state, action) => {
  state.list = action.payload
}

export const addDashboardResourceReducer: CaseReducer<
  ResourcesState,
  PayloadAction<AddDashboardResourcePayload>
> = (state, action) => {
  let payload = action.payload
  if (payload.index == undefined) {
    state.list.push(payload.resource)
  } else {
    state.list.splice(payload.index, 0, payload.resource)
  }
}

export const removeDashboardResourceReducer: CaseReducer<
  ResourcesState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.resourceId == action.payload
  })
  if (index != -1) {
    state.list.splice(index, 1)
  }
}

export const updateDashboardResourceReducer: CaseReducer<
  ResourcesState,
  PayloadAction<UpdateDashboardResourcePayload>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.resourceId == action.payload.resourceId
  })
  if (index != -1) {
    state.list[index] = action.payload.newResource
  }
}
