import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  Resource,
  ResourceContent,
  ResourceListState,
} from "@/redux/resource/resourceState"

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
    (i) => i.resourceId === action.payload.resourceId,
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
    return i.resourceId === action.payload
  })
  if (index !== -1) {
    state.splice(index, 1)
  }
}
