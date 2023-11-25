import { Resource, ResourceContent } from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ResourceListState } from "@/redux/resource/resourceState"

export const updateResourceListReducer: CaseReducer<
  ResourceListState,
  PayloadAction<Resource<ResourceContent>[]>
> = (_, action) => {
  return action.payload
}

export const addResourceItemReducer: CaseReducer<
  ResourceListState,
  PayloadAction<Resource<ResourceContent>>
> = (state, action) => {
  state = [action.payload, ...state]
  return state
}

export const updateResourceItemReducer: CaseReducer<
  ResourceListState,
  PayloadAction<Resource<ResourceContent>>
> = (state, action) => {
  const targetIndex = state.findIndex(
    (i) => i.resourceID === action.payload.resourceID,
  )
  if (targetIndex != -1) {
    state[targetIndex] = action.payload
  }
}

export const removeResourceItemReducer: CaseReducer<
  ResourceListState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.findIndex((i) => {
    return i.resourceID === action.payload
  })
  if (index !== -1) {
    state.splice(index, 1)
  }
}
