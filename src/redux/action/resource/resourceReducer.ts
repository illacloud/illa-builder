import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ResourceItemState } from "@/redux/action/resource/resourceState"

export const addResourceItemReducer: CaseReducer<
  ResourceItemState,
  PayloadAction<string>
> = (state, action) => {}
