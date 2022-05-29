import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ResourceListState,
  Resource,
} from "@/redux/currentApp/action/resource/resourceState"

export const addResourceItemReducer: CaseReducer<
  ResourceListState,
  PayloadAction<Resource>
> = (state, action) => {
  return [...state, action.payload]
}
