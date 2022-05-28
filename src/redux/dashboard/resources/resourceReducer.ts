import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  DashboardResource,
  ResourcesState,
} from "@/redux/dashboard/resources/resourceState"
import {
  AddResourcePayload,
  UpdateResourcePayload,
} from "@/redux/dashboard/resources/resourcePayload"

export const updateResourceListReducer: CaseReducer<
  ResourcesState,
  PayloadAction<DashboardResource[]>
> = (state, action) => {
  state.list = action.payload
}

export const addResourceReducer: CaseReducer<
  ResourcesState,
  PayloadAction<AddResourcePayload>
> = (state, action) => {
  let payload = action.payload
  if (payload.index == undefined) {
    state.list.push(payload.resource)
  } else {
    let list = state.list
    state.list = [
      ...list.splice(0, payload.index),
      payload.resource,
      ...list.splice(payload.index, list.length),
    ]
  }
}

export const removeResourceReducer: CaseReducer<
  ResourcesState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.resourceId == action.payload
  })
  if (index != -1) {
    let list = state.list
    state.list = [
      ...list.splice(0, index),
      ...list.splice(index + 1, list.length),
    ]
  }
}

export const updateResourceReducer: CaseReducer<
  ResourcesState,
  PayloadAction<UpdateResourcePayload>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.resourceId == action.payload.resourceId
  })
  if (index != -1) {
    state.list[index] = action.payload.newResource
  }
}
